class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]

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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def organization_params
      params.require(:organization).permit(:github_id, :url, :name, :company, :public_repos, :private_repos, :total_repos, :collaborators)
    end

    #Respond to ajax for getting repositories of that org
    def get_repos
        org_repos_stored = Array.new
        org_repos_not_stored = Array.new

        github = Octokit::Client.new access_token: current_user.oauth_token
        org_name = params.name_org

        #Get repos from org
        org_repos = github.organization_repositories org_name

        #Separate local repos from repos still not stored
        org_repos.each do |repo|
            if !Repository.exists?(:github_id => repo.id)
                #store all the info in an array
                org_repos_stored << repo
            else
                org_repos_not_stored << repo
            end
        end

        #Create object to respond with
        repos_to_send = {
            "org_repos_stored": org_repos_stored,
            "org_repos_not_stored": org_repos_not_stored
        }

        #send respond
        render json: {
            "repos" : repos_to_send
        }



    end

end
