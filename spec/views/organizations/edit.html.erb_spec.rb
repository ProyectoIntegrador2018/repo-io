require 'rails_helper'

RSpec.describe "organizations/edit", type: :view do
  before(:each) do
    @organization = assign(:organization, Organization.create!(
      :github_id => "MyString",
      :url => "MyString",
      :name => "MyString",
      :company => "MyString",
      :public_repos => 1,
      :private_repos => 1,
      :total_repos => 1,
      :collaborators => 1
    ))
  end

  it "renders the edit organization form" do
    render

    assert_select "form[action=?][method=?]", organization_path(@organization), "post" do

      assert_select "input[name=?]", "organization[github_id]"

      assert_select "input[name=?]", "organization[url]"

      assert_select "input[name=?]", "organization[name]"

      assert_select "input[name=?]", "organization[company]"

      assert_select "input[name=?]", "organization[public_repos]"

      assert_select "input[name=?]", "organization[private_repos]"

      assert_select "input[name=?]", "organization[total_repos]"

      assert_select "input[name=?]", "organization[collaborators]"
    end
  end
end
