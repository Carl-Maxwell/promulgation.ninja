class CreateSubmissionFields < ActiveRecord::Migration
  def change
    create_table :submission_fields do |t|
      t.integer :field_id
      t.text :value
      t.string :state

      t.timestamps null: false
    end
    add_index :submission_fields, :field_id
  end
end
