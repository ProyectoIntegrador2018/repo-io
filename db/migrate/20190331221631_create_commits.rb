class CreateCommits < ActiveRecord::Migration[5.2]
  def change
    create_table :commits do |t|
      t.string :title
      t.string :description
      t.integer :additions
      t.integer :deletions
      t.integer :changed_files

      t.timestamps
    end
  end
end
