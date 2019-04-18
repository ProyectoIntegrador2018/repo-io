class Repository < ApplicationRecord
    belongs_to :organization
    belongs_to :author
    has_many :commits
end
