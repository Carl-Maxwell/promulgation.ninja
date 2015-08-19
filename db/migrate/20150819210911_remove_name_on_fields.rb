class RemoveNameOnFields < ActiveRecord::Migration
  def change
    remove_column :fields, :label
    rename_column :fields, :name, :label
  end
end
