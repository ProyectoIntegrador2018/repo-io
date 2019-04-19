class RepositoriesController < ApplicationController
  before_action :require_login
  before_action :set_repository, only: [:show, :edit, :update, :destroy]

  # GET /repositories
  # GET /repositories.json
  def index
     @username = current_user.username
    set_initial_variables
  end

  # GET /repositories/1
  # GET /repositories/1.json
  def show
     github = Octokit::Client.new access_token: current_user.oauth_token
     @id = @repository.id
     repop = github.repo @repository.full_name
     total = 0
     @data_in_series = []
     if repop
         @name_repo = repop.full_name
         commits = github.commits @name_repo
         @data=Hash.new

         commits.each do |c|
             cTemp = github.commit @name_repo, c.sha
             if @data.has_key? cTemp.commit.author.email
                 @data[cTemp.commit.author.email]["name"] =cTemp.commit.author.name.to_s
                @data[cTemp.commit.author.email]["additions"] = @data[cTemp.commit.author.email]["additions"].to_i +  cTemp.stats.additions.to_i
                @data[cTemp.commit.author.email]["deletions"] = @data[cTemp.commit.author.email]["deletions"].to_i + cTemp.stats.deletions.to_i
                @data[cTemp.commit.author.email]["modified"] = @data[cTemp.commit.author.email]["modified"].to_i + cTemp.stats.modifiedw.to_i
             else
                 @data[cTemp.commit.author.email] = {
                     name: cTemp.commit.author.name.to_s,
                     additions: cTemp.stats.additions.to_i,
                     deletions: cTemp.stats.deletions.to_i,
                     modified: cTemp.stats.modified.to_i
                }
            end

        end

        @data.each do |key,value|
            @data_in_series.push([value["name"],value["additions"].to_i + value["modified"].to_i])
        end
        # @name_repo = repop.full_name
    else
        @name_repo = "nil"
    end
     @username = current_user.username





      @chart = LazyHighCharts::HighChart.new('pie') do |c|
         c.chart(
            plotBackgroundColor: nil,
            plotBorderWidth: nil,
            plotShadow: false,
            type: 'pie'
        )
        c.title(
            text: 'Contributions to repo'
        )
        c.tooltip(
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        )
        #c.options[:chart][:height] = 800
        #c.options[:chart][:width] = 800
        c.plotOptions(
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: 'black'
                    }
                }
            }
        )
        c.series(
            :type=> 'pie',
            :name=> 'percentage contribution',
            :data=> @data_in_series
        )
    end
end





  # GET /repositories/1/edit
  def edit
  end

  # POST /repositories
  # POST /repositories.json
  def create
    #@repository = Repository.new(repository_params)
    @rep = repository_params

    Rails.logger.debug("My object: #{@rep.inspect}")

    #respond_to do |format|
     # if @repository.save
    #    format.html { redirect_to @repository, notice: 'Repository was successfully created.' }
    #    format.json { render :show, status: :created, location: @repository }
     # else
    #    format.html { render :new }
    #    format.json { render json: @repository.errors, status: :unprocessable_entity }
     # end
    #end
  end

  # PATCH/PUT /repositories/1
  # PATCH/PUT /repositories/1.json
  def update
    respond_to do |format|
      if @repository.update(repository_params)
        format.html { redirect_to @repository, notice: 'Repository was successfully updated.' }
        format.json { render :show, status: :ok, location: @repository }
      else
        format.html { render :edit }
        format.json { render json: @repository.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /repositories/1
  # DELETE /repositories/1.json
  def destroy
    @repository.destroy
    respond_to do |format|
      format.html { redirect_to repositories_url, notice: 'Repository was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repository
      @repository = Repository.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def repository_params
      params.require(:repository).permit(:github_id, :url, :name, :full_name, :description, :size, :collaborator)
    end

    def set_initial_variables
      github = Octokit::Client.new access_token: current_user.oauth_token
      local_repos = Repository.all.to_a
      current_username = github.user.login
      repos_ids_stored = Repository.all.pluck(:github_id).to_set
      local_repos = []
      repos_ids_stored = Set.new()
      orgs = github.organizations #Get all organizations of the user

      #store organizations for the user logged
      orgs.each do |org_t|
          name_org = org_t.login
          #Check if its already in the database
          #If it exists should we edited? (modify code to allow this)
          if !Organization.exists?(:github_id => org_t.id)

              org_detail = github.org name_org

              Organization.transaction do
                  temp_org = Organization.new
                  temp_org.github_id = org_detail.id
                  temp_org.url = org_detail.url
                  temp_org.name = org_detail.login
                  temp_org.company = org_detail.company
                  temp_org.public_repos = org_detail.public_repos.to_i
                  temp_org.private_repos = org_detail.total_private_repos.to_i
                  temp_org.total_repos = org_detail.public_repos.to_i + org_detail.total_private_repos.to_i
                  temp_org.collaborators = org_detail.collaborators.to_i
                  temp_org.save!
              end

          end
          #For that organization store repositories minor details without commits

          #Get organization stored from databae to store the repositories that belong to it
          org_checking = Organization.find_by(github_id: org_t.id)

          #Make the user logged in relation that belongs to that organization
          if !org_checking.users.exists?(id: current_user.id)
            Organization.transaction do
             org_checking.users << current_user
             org_checking.save!
            end
          end

          #Get repositories for that organization
          repos_org = github.organization_repositories name_org

          #Loop through repositories and stored the ones that hvent been saved
          repos_org.each do |repo_t|
              #Is the repo already stored?
              if !Repository.exists?(:github_id => repo_t.id)

                  #Get info of repo and save it in the corresponding org
                  Repository.transaction do
=begin
                      #Get the author's username of the corresponding repository
                      author_username = repo_t.owner.login
                      author_temp_id = nil

                      #Check if that author already exists in DB
                      if !Author.exists?(:username => author_username)
                          #Get authors name from github
                          author_name = (github.user author_username).name

                          #Use authors name and username to create a new user and reference it on the repository
                            Author.transaction do
                                author_temp = Author.new
                                author_temp.name = author_name
                                author_temp.username = author_username

                                #Save it in the DB
                                author_temp.save!

                                #Get id of the stored author
                                author_temp_id = author_temp.id

                            end
                      else
                          #Get author id
                          author_temp_id = Author.find_by(:username => author_username).id

                      end
=end

                      #Create new repository for the organization being checked and use authors reference
                      org_checking.repositories.create(
                          #author_id: author_temp_id, #using authors reference here
                          github_id: repo_t.id,
                          url: repo_t.url,
                          name: repo_t.name,
                          full_name: repo_t.full_name,
                          description: repo_t.description,
                          size: repo_t.size,
                          collaborator: false #SIGO SIN ENTENDER CUAL ES EL PROPOSITO DE ESTO... (ATTE. EDGAR)
                      )
                  end #end for transaction

              end #end for if

          end #end for repos loop





      end #end for orgs loop



      @amount_orgs = orgs.size
      @userID = current_username
      @orgs_with_repos = {}

      @orgs_with_repos["local"] = [];
      #Organize stored repos in organizations
      local_repos.each do |repo|
          @orgs_with_repos["local"].push(repo)
          repos_ids_stored.add(repo.id)
      end

      #List repositories i have contribute
      github.repositories(current_username).each do |repo_item|
          if !repos_ids_stored.include? repo_item.id
            repo = Repository.new
            repo.github_id = repo_item.id
            repo.url = repo_item.html_url
            repo.name = repo_item.name
            repo.full_name = repo_item.full_name
            repo.description = repo_item.description
            repo.size = repo_item.size
            repo.collaborator = repo_item.collaborators_url

            local_repos.push(repo)
            repos_ids_stored.add(repo_item.id)

            @orgs_with_repos["local"].push(repo)
          end
      end

      #List repositories of organizations I belong
      orgs.each do |o|
         name_org = o.login

         repos_org = github.organization_repositories name_org
         @orgs_with_repos[name_org] =[]
         repos_org.each do |repo_item|
             if !repos_ids_stored.include? repo_item.id
               repo = Repository.new
               repo.github_id = repo_item.id
               repo.url = repo_item.html_url
               repo.name = repo_item.name
               repo.full_name = repo_item.full_name
               repo.description = repo_item.description
               repo.size = repo_item.size
               repo.collaborator = repo_item.collaborators_url

               local_repos.push(repo)
               repos_ids_stored.add(repo_item.id)

               @orgs_with_repos[name_org].push(repo)
             end
         end

      end




      @repositories = local_repos
      @repo = Repository.new
      # @site = github.oauth.login
    end
end
