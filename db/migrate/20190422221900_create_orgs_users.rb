class CreateOrgsUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :orgs_users do |t|
      t.belongs_to :organizations, index: true, foreign_key: true
	  #t.references :organizations, index: true, foreign_key: true
      t.belongs_to :users, index: true, foreign_key: true
	  #t.references :users, index: true, foreign_key: true

      t.timestamps
    end
  end
end
