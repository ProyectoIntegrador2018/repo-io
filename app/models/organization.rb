class Organization < ApplicationRecord
  has_many :repositories
  has_many :orgs_users
  has_many :users, through: :orgs_users
end
