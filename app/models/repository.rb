class Repository < ApplicationRecord
  belongs_to :organization
  has_many :commits, dependent: :destroy
  has_many :repository_authors, dependent: :destroy
  has_many :authors, through: :repository_authors, dependent: :destroy

  scope :with_organization, -> (org_id) { where organization_id: org_id }
  scope :with_date, (lambda do |start_date, end_date|
    includes(:commits).where("commits.created > ? AND commits.created < ?",
      start_date, end_date).references(:commits).uniq
  end)

  def deliver(user_id)
    user = User.find(user_id)
    github = Octokit::Client.new access_token: user.oauth_token
    remote_repo = github.repo self.full_name
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
            author.repositories << self
            author.save
          else
            author = creator.first
            if !author.repositories.where(id: self.id).any?
              author.repositories << self
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
          commit.repository = self
          new_commits << commit
        end
        new_commits.each(&:save)
      end

    else
      name_repo = "nil"
    end

  end

end
