class RemoveNotNullConstaintOnFieldsFormId < ActiveRecord::Migration
  def change
    change_column_null :fields, :form_id, true
  end
end
