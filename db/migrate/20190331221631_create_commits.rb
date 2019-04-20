class CreateCommits < ActiveRecord::Migration[5.2]
  def change
    create_table :commits do |t|
      t.string :message
      t.string :author_username
      t.integer :additions
      t.integer :deletions
      t.integer :files_changed

      t.timestamps
    end
  end
end
