opts = { scope: 'user:email, read:org, repo' }

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, ENV['GITHUB_CLIENT_ID'], ENV['GITHUB_CLIENT_SECRET'], scope: 'repo, read:org'
end
