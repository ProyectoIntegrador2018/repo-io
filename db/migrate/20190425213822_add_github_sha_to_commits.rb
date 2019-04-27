class AddGithubShaToCommits < ActiveRecord::Migration[5.2]
  def change
    add_column :commits, :github_sha, :string
  end
end
