class RenameTypeToFieldTypeOnFIelds < ActiveRecord::Migration
  def change
    rename_column :fields, :type, :fieldType
  end
end
