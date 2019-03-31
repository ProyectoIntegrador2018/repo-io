json.extract! commit, :id, :title, :description, :additions, :deletions, :changed_files, :created_at, :updated_at
json.url commit_url(commit, format: :json)
