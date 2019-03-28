require 'rails_helper'

RSpec.describe "repositories/show", type: :view do
  before(:each) do
    @repository = assign(:repository, Repository.create!(
      :github_id => "Github",
      :url => "Url",
      :name => "Name",
      :full_name => "Full Name",
      :description => "Description",
      :size => 2,
      :collaborator => false
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Github/)
    expect(rendered).to match(/Url/)
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Full Name/)
    expect(rendered).to match(/Description/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/false/)
  end
end
