class AddSlugOnForms < ActiveRecord::Migration
  def change
    add_column :forms, :slug, :integer
    add_index :forms, :slug, unique: true
  end
end
