class CreateRepositoryAuthors < ActiveRecord::Migration[5.2]
  def change
    create_table :repository_authors do |t|
      t.belongs_to :repository, foreign_key: true
      t.belongs_to :author, foreign_key: true

      t.timestamps
    end
  end
end
