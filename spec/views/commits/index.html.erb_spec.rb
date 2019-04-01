require 'rails_helper'

RSpec.describe "commits/index", type: :view do
  before(:each) do
    assign(:commits, [
      Commit.create!(
        :title => "Title",
        :description => "Description",
        :additions => 2,
        :deletions => 3,
        :changed_files => 4
      ),
      Commit.create!(
        :title => "Title",
        :description => "Description",
        :additions => 2,
        :deletions => 3,
        :changed_files => 4
      )
    ])
  end

  it "renders a list of commits" do
    render
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "Description".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
  end
end
