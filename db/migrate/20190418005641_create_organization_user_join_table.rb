class CreateOrganizationUserJoinTable < ActiveRecord::Migration[5.2]
  def change
      create_table :organizations_users, id: false do |t|
          t.integer :organization_id
          t.integer :user_id
      end

      add_index :organizations_users, :organization_id
      add_index :organizations_users, :user_id
  end
end
