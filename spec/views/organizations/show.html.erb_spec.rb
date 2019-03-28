require 'rails_helper'

RSpec.describe "organizations/show", type: :view do
  before(:each) do
    @organization = assign(:organization, Organization.create!(
      :github_id => "Github",
      :url => "Url",
      :name => "Name",
      :company => "Company",
      :public_repos => 2,
      :private_repos => 3,
      :total_repos => 4,
      :collaborators => 5
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Github/)
    expect(rendered).to match(/Url/)
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Company/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/3/)
    expect(rendered).to match(/4/)
    expect(rendered).to match(/5/)
  end
end
