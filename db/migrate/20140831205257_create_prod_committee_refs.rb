class CreateProdCommitteeRefs < ActiveRecord::Migration
  def change
    create_table :prod_committee_refs do |t|
      t.string :committee_id
      t.string :committee_name
      t.integer :committee_seq_id

      t.timestamps
    end
  end
end
