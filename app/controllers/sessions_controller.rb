class SessionsController < ApplicationController
  def new
      if current_user
           store_orgs_needed()
           redirect_to repositories_path
      end

  end

  def create
    user = User.from_omniauth(request.env['omniauth.auth'])

    if user.valid?
      session[:user_id] = user.id

      #Store missing organizations of user logged in
      store_orgs_needed()



      redirect_to repositories_path

    end
  end

  def destroy
    reset_session
    redirect_to root_path
  end

  #Store missing organization of user logged in
  def store_orgs_needed

      github = Octokit::Client.new access_token: current_user.oauth_token

      #if not exist an 'user organization' on db save it
      username = github.login
      if !Organization.where(name: username).any?
        org = Organization.new
        org.name = username
        org.save
        current_user.organizations << org
        current_user.save!
      end

      #Save missing organizations for the user logged in
      orgs = github.organizations #Get all organizations of the user

      #For each org..
      orgs.each do |org_t|
          name_org = org_t.login
          #Check if its already in the database
          #If it exists should we edited? (modify code to allow this)
          if !Organization.exists?(:github_id => org_t.id)

              #Get detail info of specific org from GITHUB
              org_detail = github.org name_org

              #Create org
              temp_org = Organization.new
              temp_org.github_id = org_detail.id
              temp_org.url = org_detail.url
              temp_org.name = org_detail.login
              temp_org.company = org_detail.company
              temp_org.public_repos = org_detail.public_repos.to_i
              temp_org.private_repos = org_detail.total_private_repos.to_i
              temp_org.total_repos = org_detail.public_repos.to_i + org_detail.total_private_repos.to_i
              temp_org.collaborators = org_detail.collaborators.to_i

              #Save org
              temp_org.save!

              #Save organization into user relation
              current_user.organizations << temp_org
              current_user.save!


          end
      end

  end
end
