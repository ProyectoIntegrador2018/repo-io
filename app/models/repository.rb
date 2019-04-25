class Repository < ApplicationRecord
  belongs_to :organization
  has_many :commits, dependent: :destroy
  has_many :repository_authors, dependent: :destroy
  has_many :authors, through: :repository_authors, dependent: :destroy

  scope :with_organization, -> (org_id) { where organization_id: org_id }
  scope :with_date, (lambda do |start_date, end_date|
    includes(:commits).where("commits.created > ? AND commits.created < ?",
      start_date, end_date).references(:commits).uniq
  end)

end
