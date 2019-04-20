class RepositoryAuthor < ApplicationRecord
  belongs_to :repository
  belongs_to :author
end
