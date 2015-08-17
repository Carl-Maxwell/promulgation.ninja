class RemoveNotNullFormIdOnFields < ActiveRecord::Migration
  def change
    change_column :fields, :form_id, :integer
  end
end
