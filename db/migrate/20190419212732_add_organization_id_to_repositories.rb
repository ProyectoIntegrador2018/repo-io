class AddOrganizationIdToRepositories < ActiveRecord::Migration[5.2]
  def change
    add_reference :repositories, :organization, foreign_key: true
  end
end
