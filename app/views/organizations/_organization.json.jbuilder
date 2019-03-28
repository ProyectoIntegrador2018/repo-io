json.extract! organization, :id, :github_id, :url, :name, :company, :public_repos, :private_repos, :total_repos, :collaborators, :created_at, :updated_at
json.url organization_url(organization, format: :json)
