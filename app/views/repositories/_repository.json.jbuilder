json.extract! repository, :id, :github_id, :url, :name, :full_name, :description, :size, :collaborator, :created_at, :updated_at
json.url repository_url(repository, format: :json)
