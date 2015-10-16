class AddFieldSlugToFields < ActiveRecord::Migration
  def change
    add_column :fields, :field_slug, :integer

    add_index :fields, :field_slug
  end
end
