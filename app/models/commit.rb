class Commit < ApplicationRecord
  belongs_to :repository
  scope :with_date, (lambda do |start_date, end_date|
    Commit.where("created >= ? AND created <= ?",
                                    start_date, end_date).uniq
  end)
end
