class CreateOrganizations < ActiveRecord::Migration[5.2]
  def change
    create_table :organizations do |t|
      t.string :github_id
      t.string :url
      t.string :name
      t.string :company
      t.integer :public_repos
      t.integer :private_repos
      t.integer :total_repos
      t.integer :collaborators

      t.timestamps
    end
  end
end
