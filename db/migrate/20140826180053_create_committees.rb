class CreateCommittees < ActiveRecord::Migration
  def change
    create_table :committees do |t|
      t.string :committee_id
      t.string :name
      t.string :members_id
      t.references :senator, index: true

      t.timestamps
    end
  end
end
