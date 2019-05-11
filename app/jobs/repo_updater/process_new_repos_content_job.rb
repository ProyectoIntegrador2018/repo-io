module RepoUpdater
    class ProcessNewReposContentJob < Struct.new(:repo_id, :user_id)

        def enqueue(job)
          job.delayed_reference_id   = repo_id
          job.delayed_reference_type = 'RepoUpdater::NewReposContent'
          job.save!
        end

        #Push commits for the newly created repository
        def perform()
            user = User.find(user_id)
            selfRepo = Repository.find(repo_id)
            github = Octokit::Client.new access_token: user.oauth_token
            remote_repo = github.repo selfRepo.full_name
            if remote_repo
              #the request fails if the repo is empty so is request by try catch block
              name_repo = remote_repo.full_name
              begin
                commits = github.commits name_repo
              rescue
                commits = nil
              end

              if commits
                new_commits = []
                commits.each do |c|
                  cTemp = github.commit name_repo, c.sha
                  commit = Commit.new
                  #if Author not exists in that repository
                  creator = Author.where(username: cTemp.commit.author.email.to_s)
                  if !creator.any?
                    author = Author.new
                    author.username = cTemp.commit.author.email.to_s
                    author.name = cTemp.commit.author.name.to_s
                    author.repositories << selfRepo
                    author.save
                  else
                    author = creator.first
                    if !author.repositories.where(id: selfRepo.id).any?
                      author.repositories << selfRepo
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
                  commit.repository = selfRepo
                  new_commits << commit
                end
                new_commits.each(&:save)
              end

            else
              name_repo = "nil"
            end
        end

    end
end
