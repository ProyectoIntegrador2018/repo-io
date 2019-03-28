require 'rails_helper'

RSpec.describe "repositories/index", type: :view do
  before(:each) do
    assign(:repositories, [
      Repository.create!(
        :github_id => "Github",
        :url => "Url",
        :name => "Name",
        :full_name => "Full Name",
        :description => "Description",
        :size => 2,
        :collaborator => false
      ),
      Repository.create!(
        :github_id => "Github",
        :url => "Url",
        :name => "Name",
        :full_name => "Full Name",
        :description => "Description",
        :size => 2,
        :collaborator => false
      )
    ])
  end

  it "renders a list of repositories" do
    render
    assert_select "tr>td", :text => "Github".to_s, :count => 2
    assert_select "tr>td", :text => "Url".to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Full Name".to_s, :count => 2
    assert_select "tr>td", :text => "Description".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
  end
end
