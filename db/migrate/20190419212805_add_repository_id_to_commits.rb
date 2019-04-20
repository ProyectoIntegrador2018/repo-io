class AddRepositoryIdToCommits < ActiveRecord::Migration[5.2]
  def change
    add_reference :commits, :repository, foreign_key: true
  end
end
