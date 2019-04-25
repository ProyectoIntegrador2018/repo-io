class AddCreatedToCommits < ActiveRecord::Migration[5.2]
  def change
    add_column :commits, :created, :date
  end
end
