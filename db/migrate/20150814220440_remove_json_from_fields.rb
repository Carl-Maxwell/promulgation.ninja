class RemoveJsonFromFields < ActiveRecord::Migration
  def change
    rename_column :fields, :key, :name

    add_column :fields, :label, :string
    add_column :fields, :type , :string

    add_column :fields, :options , :string
    add_column :fields, :field_id, :integer

    add_index :fields, :field_id
  end
end
