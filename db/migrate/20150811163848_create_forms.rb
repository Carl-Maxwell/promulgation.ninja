class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.integer :version

      t.timestamps null: false
    end
    add_index :forms, :user_id
  end
end
