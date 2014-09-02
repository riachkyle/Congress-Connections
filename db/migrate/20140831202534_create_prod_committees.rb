class CreateProdCommittees < ActiveRecord::Migration
  def change
    create_table :prod_committees do |t|
      t.string :bioguide_id
      t.string :committee_id
      t.string :committee_name
      t.string :senator_name

      t.timestamps
    end
  end
end
