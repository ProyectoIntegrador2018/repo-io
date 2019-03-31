require 'rails_helper'

RSpec.describe "commits/new", type: :view do
  before(:each) do
    assign(:commit, Commit.new(
      :title => "MyString",
      :description => "MyString",
      :additions => 1,
      :deletions => 1,
      :changed_files => 1
    ))
  end

  it "renders new commit form" do
    render

    assert_select "form[action=?][method=?]", commits_path, "post" do

      assert_select "input[name=?]", "commit[title]"

      assert_select "input[name=?]", "commit[description]"

      assert_select "input[name=?]", "commit[additions]"

      assert_select "input[name=?]", "commit[deletions]"

      assert_select "input[name=?]", "commit[changed_files]"
    end
  end
end
