require 'rails_helper'

RSpec.describe "Commits", type: :request do
  describe "GET /commits" do
    it "works! (now write some real specs)" do
      get commits_path
      expect(response).to have_http_status(200)
    end
  end
end
