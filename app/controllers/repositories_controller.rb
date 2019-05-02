class RepositoriesController < ApplicationController
  before_action :require_login
  before_action :set_repository, only: [:show, :edit, :update, :destroy]

  # GET /repositories
  # GET /repositories.json
  def index
    @username = current_user.username
    set_initial_variables
    # @repositories = Repository.with_organization(params[:org_id]) if params[:org_id].present?
    # @repositories = Repository.with_organization(1).with_date(params[:from],params[:until]) if params[:from] && params[:until]
  end

  # GET /repositories/1
  # GET /repositories/1.json
  def show
    @data_in_series = []
    if params[:from_date].present? && params[:until_date].present?
      @from_date = params[:from_date]
      @until_date = params[:until_date]
      commits = @repository.commits.with_date(@from_date, @until_date)
      @authors = []
      commits.each { |commit| @authors << @repository.authors.where(username: commit.author_username).first }
      @authors = @authors.uniq
      @authors.each do |author|
        @data_in_series.push([author.name, @repository.commits.where(author_username: author.username).with_date(@from_date, @until_date).sum(&:additions) + @repository.commits.where(author_username: author.username).with_date(@from_date, @until_date).sum(&:files_changed) ])
      end
    else
      @authors = @repository.authors
      @username = current_user.username
      @data_in_series = []
      @authors.each do |author|
        @data_in_series.push([author.name, @repository.commits.where(author_username: author.username).sum(&:additions) + @repository.commits.where(author_username: author.username).sum(&:files_changed) ])
      end
    end

    @chart = LazyHighCharts::HighChart.new('pie') do |c|
      c.chart(
          plotBackgroundColor: nil,
          plotBorderWidth: nil,
          plotShadow: false,
          type: 'pie'
      )
      c.title(
          text: '<strong>Contribution Percentage</strong>'
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
    github = Octokit::Client.new access_token: current_user.oauth_token

    #if not exist an 'user organization' on db
    username = github.login
    # if !Organization.where(name: username).any?
    #   org = Organization.new
    #   org.name = username
    #   org.save
    #   current_user.organizations << org
    #   current_user.save
    # end

    @repository = Repository.new(repository_params)
    remote_repo = github.repo @repository.full_name
    if remote_repo
      #if the repo comes from an org
      if remote_repo.organization
        #if the org exists on database
        if Organization.where(github_id: remote_repo.organization.id).any?
          @repository.organization = Organization.where(github_id: remote_repo.organization.id).first

        else
          org = Organization.new
          remote_org = github.org remote_repo.organization.login
          org.github_id = remote_org.id
          org.url = remote_org.url
          org.name = remote_org.login
          org.public_repos = remote_org.public_repos
          org.private_repos = remote_org.total_private_repos
          org.total_repos = org.public_repos + org.private_repos
          org.collaborators = remote_org.collaborators
          org.save

          current_user.organizations << org
          current_user.save

          @repository.organization = org

        end
      else
        @repository.organization = Organization.where(name: username).first

      end

      @repository.save
      #the request fails if the repo is empty so is request by try catch block
      @name_repo = remote_repo.full_name
      begin
        commits = github.commits @name_repo
      rescue
        commits = nil
      end

      if commits
        new_commits = []
        commits.each do |c|
          cTemp = github.commit @name_repo, c.sha
          commit = Commit.new
          #if Author not exists in that repository
          creator = Author.where(username: cTemp.commit.author.email.to_s)
          if !creator.any?
            author = Author.new
            author.username = cTemp.commit.author.email.to_s
            author.name = cTemp.commit.author.name.to_s
            author.repositories << @repository
            author.save
          else
            author = creator.first
            if !author.repositories.where(id: @repository.id).any?
              author.repositories << @repository
            end
            author.save
          end
          commit.github_sha = c.sha
          commit.message = cTemp.commit.message.to_s
          commit.additions = cTemp.stats.additions.to_i
          commit.deletions = cTemp.stats.deletions.to_i
          commit.files_changed = cTemp.files.count.to_i
          commit.created = cTemp.commit.author.date
          commit.author_username = Author.where(username: cTemp.commit.author.email.to_s).first.username
          commit.repository = @repository
          new_commits << commit
        end
        new_commits.each(&:save)
      end

    else
      @name_repo = "nil"
    end

    respond_to do |format|
     if @repository.save
       format.html { redirect_to @repository, notice: 'Repository was successfully created.' }
       format.json { render :show, status: :created, location: @repository }
     else
       format.html { render :new }
       format.json { render json: @repository.errors, status: :unprocessable_entity }
     end
    end
  end

  # PATCH/PUT /repositories/1
  # PATCH/PUT /repositories/1.json
  def update
    respond_to do |format|
      #if @repository.update(repository_params)
      #  format.html { redirect_to @repository, notice: 'Repository was successfully updated.' }
      #  format.json { render :show, status: :ok, location: @repository }
      #else
      #  format.html { render :edit }
      #  format.json { render json: @repository.errors, status: :unprocessable_entity }
      #end

      github = Octokit::Client.new access_token: current_user.oauth_token

      #repo_aux = Repository.where(id: params["github_id"])
      #abort (params["repo_id"].inspect)
      repo_aux = Repository.find_by(id: params["repo_id"])
      most_recent_commit = repo_aux.commits.order('created DESC').first

      #get new commits
      #new_commits = github.commits_since(repo_aux.github_id,most_recent_commit.created.to_s)
      new_commits = github.commits_since(repo_aux.full_name,most_recent_commit.created.to_s)

      #add new commits
      new_commits.each do |commit|
        if !Commit.where(github_sha: commit.sha).any?
          commit_temp = Commit.new
          cTemp = github.commit @repository.full_name, commit.sha

          #if Author not exists in that repository
          if !Author.where(username: cTemp.commit.author.email.to_s).any?
            author = Author.new
            author.username = cTemp.commit.author.email.to_s
            author.name = cTemp.commit.author.name.to_s
            author.repositories << repo_aux
            author.save
          else
            author = Author.where(username: cTemp.commit.author.email.to_s).first
            if !author.repositories.where(id: repo_aux.id).any?
              author.repositories << repo_aux
            end
            author.save
          end
          commit_temp.github_sha = commit.sha
          commit_temp.message = cTemp.commit.message.to_s
          commit_temp.additions = cTemp.stats.additions.to_i
          commit_temp.deletions = cTemp.stats.deletions.to_i
          commit_temp.files_changed = cTemp.files.count.to_i
          commit_temp.created = cTemp.commit.author.date
          commit_temp.author_username = Author.where(username: cTemp.commit.author.email.to_s).first.username
          commit_temp.repository = repo_aux
          commit_temp.save

        end
      end

      format.html { redirect_to repo_aux, notice: 'Repository was successfully updated.' }
      format.json { render :show, status: :updated, location: repo_aux }

    end
  end

  # DELETE /repositories/1
  # DELETE /repositories/1.json
  def destroy
    @repository.destroy
    respond_to do |format|
      format.html { redirect_to repositories_path, notice: 'Repository was successfully destroyed.' }
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

    #Get the author that belongs to the user if there is one
    current_author = Author.find_by(username: current_user.email)

    #Orgs names to display
    @orgs_name = Array.new

    #Get the organizations that belongs to the repositories that belong to the author's user
    if(current_author != nil)


        temp_repos = current_author.repositories
        temp_repos.each do  |repos|
            org_to_add = repos.organization.name
            @orgs_name.each do |org_added|
                if org_to_add == org_added
                    org_to_add = nil
                    break
                end
            end
            if !org_to_add.nil?
                @orgs_name.push org_to_add
            end
        end

    end

    #Get the unique organizations that belongs to the author'repositories and to the user
    orgs_user = current_user.organizations

    if(@orgs_name.size > 0)
        orgs_user.each do | org_user|
            #Check if org_user is already stored in @orgs
            org_temp_to_add = org_user.name
            @orgs_name.each do |org_name_added|
                if(org_temp_to_add === org_name_added)
                    org_temp_to_add = nil
                    break
                end
            end

            if(!org_temp_to_add.nil?)
                @orgs_name.push org_temp_to_add
            end
        end
    else
        orgs_user.each do |org_t|
            @orgs_name.push org_t.name
        end
    end



  end
end
