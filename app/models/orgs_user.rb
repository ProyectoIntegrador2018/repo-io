class OrgsUser < ApplicationRecord
  belongs_to :organization
  belongs_to :user
  #references :organization
  #references :user
  
end
