class Repository < ApplicationRecord
  has_many :commits, dependent: :destroy
  has_many :repository_authors, dependent: :destroy
  has_many :authors, through: :repository_authors, dependent: :destroy
end
