class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.integer :form_id
      t.string :useragent
      t.string :ip

      t.timestamps null: false
    end
    add_index :submissions, :form_id
  end
end
