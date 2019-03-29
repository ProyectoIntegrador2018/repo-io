require 'rails_helper'

RSpec.describe "repositories/edit", type: :view do
  before(:each) do
    @repository = assign(:repository, Repository.create!(
      :github_id => "MyString",
      :url => "MyString",
      :name => "MyString",
      :full_name => "MyString",
      :description => "MyString",
      :size => 1,
      :collaborator => false
    ))
  end

  it "renders the edit repository form" do
    render

    assert_select "form[action=?][method=?]", repository_path(@repository), "post" do

      assert_select "input[name=?]", "repository[github_id]"

      assert_select "input[name=?]", "repository[url]"

      assert_select "input[name=?]", "repository[name]"

      assert_select "input[name=?]", "repository[full_name]"

      assert_select "input[name=?]", "repository[description]"

      assert_select "input[name=?]", "repository[size]"

      assert_select "input[name=?]", "repository[collaborator]"
    end
  end
end
