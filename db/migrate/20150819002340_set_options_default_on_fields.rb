class SetOptionsDefaultOnFields < ActiveRecord::Migration
  def change
    change_column :fields, :options, :text, default: "{}"
  end
end
