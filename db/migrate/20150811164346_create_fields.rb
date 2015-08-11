class CreateFields < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.integer :form_id, null: false
      t.string :key
      t.text :value

      t.timestamps null: false
    end
    add_index :fields, :form_id
  end
end
