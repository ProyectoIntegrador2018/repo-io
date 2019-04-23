class RenameOrgsUsers < ActiveRecord::Migration[5.2]
  def change
	rename_column :orgs_users, :users_id, :user_id
	rename_column :orgs_users, :organizations_id, :organization_id
  end
end
