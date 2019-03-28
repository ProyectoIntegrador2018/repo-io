require 'rails_helper'

RSpec.describe "repositories/new", type: :view do
  before(:each) do
    assign(:repository, Repository.new(
      :github_id => "MyString",
      :url => "MyString",
      :name => "MyString",
      :full_name => "MyString",
      :description => "MyString",
      :size => 1,
      :collaborator => false
    ))
  end

  it "renders new repository form" do
    render

    assert_select "form[action=?][method=?]", repositories_path, "post" do

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
