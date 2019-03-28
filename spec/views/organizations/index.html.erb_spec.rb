require 'rails_helper'

RSpec.describe "organizations/index", type: :view do
  before(:each) do
    assign(:organizations, [
      Organization.create!(
        :github_id => "Github",
        :url => "Url",
        :name => "Name",
        :company => "Company",
        :public_repos => 2,
        :private_repos => 3,
        :total_repos => 4,
        :collaborators => 5
      ),
      Organization.create!(
        :github_id => "Github",
        :url => "Url",
        :name => "Name",
        :company => "Company",
        :public_repos => 2,
        :private_repos => 3,
        :total_repos => 4,
        :collaborators => 5
      )
    ])
  end

  it "renders a list of organizations" do
    render
    assert_select "tr>td", :text => "Github".to_s, :count => 2
    assert_select "tr>td", :text => "Url".to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Company".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
    assert_select "tr>td", :text => 5.to_s, :count => 2
  end
end
