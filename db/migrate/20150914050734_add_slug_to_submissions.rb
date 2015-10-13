class AddSlugToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :slug, :integer
    add_index :submissions, :slug
  end
end
