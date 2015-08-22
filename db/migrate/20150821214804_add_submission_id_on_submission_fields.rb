class AddSubmissionIdOnSubmissionFields < ActiveRecord::Migration
  def change
    add_column :submission_fields, :submission_id, :integer, null: false
    add_index :submission_fields, :submission_id
  end
end
