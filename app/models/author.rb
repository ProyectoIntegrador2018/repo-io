class Author < ApplicationRecord
  has_many :repository_authors
  has_many :repositories, through: :repository_authors
end
