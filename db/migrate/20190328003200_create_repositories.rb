class CreateRepositories < ActiveRecord::Migration[5.2]
  def change
    create_table :repositories do |t|
      t.string :github_id
      t.string :url
      t.string :name
      t.string :full_name
      t.string :description
      t.integer :size
      t.boolean :collaborator
      t.references :author
      t.references :organization
      t.timestamps
    end
  end
end
