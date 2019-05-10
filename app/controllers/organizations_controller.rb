class OrganizationsController < ApplicationController


  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = Organization.all
  end

  # GET /organizations/1
  # GET /organizations/1.json
  def show
  end

  # GET /organizations/new
  def new
    @organization = Organization.new
  end

  # GET /organizations/1/edit
  def edit
  end

  # POST /organizations
  # POST /organizations.json
  def create
    @organization = Organization.new(organization_params)

    respond_to do |format|
      if @organization.save
        format.html { redirect_to @organization, notice: 'Organization was successfully created.' }
        format.json { render :show, status: :created, location: @organization }
      else
        format.html { render :new }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /organizations/1
  # PATCH/PUT /organizations/1.json
  def update
    respond_to do |format|
      if @organization.update(organization_params)
        format.html { redirect_to @organization, notice: 'Organization was successfully updated.' }
        format.json { render :show, status: :ok, location: @organization }
      else
        format.html { render :edit }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /organizations/1
  # DELETE /organizations/1.json
  def destroy
    @organization.destroy
    respond_to do |format|
      format.html { redirect_to organizations_url, notice: 'Organization was successfully destroyed.' }
      format.json { head :no_content }
    end
  end




  #Respond to ajax for getting repositories of that org
  def repos
      #Get Name of the organization
      org_name = ""
      start_date = nil
      end_date = nil

      if !params["from"].nil?
          start_date = params["from"].to_date
      end

      if !params["until"].nil?
          end_date = params["until"].to_date
      end

      if !params["org_name"].blank?
          org_name = params["org_name"]
          #Get repos from specific organization
          repos_from_org = self.get_repos_from_orgs org_name

          pp "WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"
          pp repos_from_org["repos_stored"]

          #Filter repos to send by specified date filter
          repos_to_send = filter_org_repos_between repos_from_org, start_date, end_date


          #Render partial and send it as a string
          render json: { repos: render_to_string('repositories/_repo', layout: false, locals: {org_repos_stored: repos_to_send['repos_stored'], org_repos_not_stored: repos_to_send['repos_not_stored'] }) }
      end

  end


#Filters the repositories in organizations that have been commited something between to dates (excluding those dates)
  def filter_org_repos_between(repos, start_date, end_date)
          #Filter local repos
          repos_stored = Array.new
          repos_after_start_date = Array.new
          if (!start_date.nil? && !end_date.nil?)
             repos["repos_stored"].each do |repo|
                if repo.commits.where("commits.created > ? AND commits.created < ?", start_date, end_date).any?
                    repos_stored.push repo
                end
             end
         elsif !start_date.nil? && end_date.nil?
             repos["repos_stored"].each do |repo|
                if repo.commits.where("commits.created > ?", start_date).any?
                    repos_stored.push repo
                end
             end
         elsif start_date.nil? && !end_date.nil?
             repos["repos_stored"].each do |repo|
                if repo.commits.where("commits.created < ?", end_date).any?
                    repos_stored.push repo
                end
            end
        else
            repos_stored = repos["repos_stored"]
        end


      #Filter not stored repos
      repos_not_stored = Array.new
      github = Octokit::Client.new access_token: current_user.oauth_token #connect to github with octokit

      #filter repos that werent updated between that range
      repos["repos_not_stored"].each do |repo|
          if date_in_range start_date, end_date, repo.updated_at
              repos_not_stored.push repo
          end
      end

      #Return repos
      repos_to_return = Hash.new
      repos_to_return["repos_stored"] = repos_stored
      repos_to_return["repos_not_stored"] = repos_not_stored

      return repos_to_return

  end

  def date_in_range(start_date, end_date, date_to_check)
      bigger_than_start_date = true
      bigger_than_end_date = true

      if  !start_date.nil? && date_to_check <= start_date
          bigger_than_start_date =  false;
      end

      if !end_date.nil? && date_to_check >= end_date
          bigger_than_end_date = false
      end

      return bigger_than_start_date && bigger_than_end_date

  end

  #Get repos from specific organization
  def get_repos_from_orgs(org_name)
      org_repos_stored = Array.new
      org_repos_not_stored = Array.new
      org_repos = Array.new

      github = Octokit::Client.new access_token: current_user.oauth_token


      if(org_name == github.login)
          #Get public and private repositories made by the user logged in

          user_repos = github.repositories #Get all repos user has collaborated in

          #Stored repos that belongs only to the user
          user_repos.each do |repo_temp|
              if repo_temp.owner.login == github.login
                  org_repos << repo_temp
              end
          end
      elsif (User.where(username: org_name).any?)
          #Get repos where the user logged has collaborated and belongs to the "organization" of another user
          repos_collab_user = Author.find_by(username:current_user.email).repositories.uniq
          repos_org_temp = Organization.find_by(name:org_name).repositories.uniq

          repos_collab_user.each do |repo_user|

              repos_org_temp.each do| repo_org|
                  if repo_user.id == repo_org.id
                      org_repos_stored << repo_user
                      break
                  end
              end
          end
          #Esta info se saca de la base de datos
      else
          #Get repos from org
         org_repos = github.organization_repositories org_name

      end


      #Separate local repos from repos still not stored
      org_repos.each do |repo|
          if !Repository.exists?(github_id: repo.id)


              #store all the info in an array
              org_repos_not_stored.push repo
          else

              repo_t = Repository.find_by(github_id: repo.id)
              org_repos_stored.push repo_t
          end
      end

      #Create object to respond with
      repos_to_send = Hash.new
      repos_to_send["repos_stored"] = org_repos_stored
      repos_to_send["repos_not_stored"] = org_repos_not_stored

      return repos_to_send
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def organization_params
      params.require(:organization).permit(:github_id, :url, :name, :company, :public_repos, :private_repos, :total_repos, :collaborators)
    end





end
