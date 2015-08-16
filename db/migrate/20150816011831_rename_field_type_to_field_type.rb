class RenameFieldTypeToFieldType < ActiveRecord::Migration
  def change
    rename_column :fields, :fieldType, :field_type 
  end
end
