class CreateSenatorCommitteeRef2s < ActiveRecord::Migration
  def change
    create_table :senator_committee_ref_2s do |t|
      t.string :committee_id
      t.string :committee_name
      t.integer :committee_seq_id

      t.timestamps
    end
  end
end
