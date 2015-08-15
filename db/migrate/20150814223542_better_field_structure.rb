class BetterFieldStructure < ActiveRecord::Migration
  def change
    change_column :fields, :options, :text
    change_column :fields, :value, :string
  end
end
