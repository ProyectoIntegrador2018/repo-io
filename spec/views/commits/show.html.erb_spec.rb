require 'rails_helper'

RSpec.describe "commits/show", type: :view do
  before(:each) do
    @commit = assign(:commit, Commit.create!(
      :title => "Title",
      :description => "Description",
      :additions => 2,
      :deletions => 3,
      :changed_files => 4
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/Description/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/3/)
    expect(rendered).to match(/4/)
  end
end
