class RemoveUniqueConstraintFromFormsSlug < ActiveRecord::Migration
  def change
    remove_index :forms, :slug
    add_index :forms, :slug 
  end
end
