class AddUserIdToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_reference :organizations, :user, foreign_key: true
  end
end
