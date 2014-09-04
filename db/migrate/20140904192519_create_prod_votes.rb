class CreateProdVotes < ActiveRecord::Migration
  def change
    create_table :prod_votes do |t|
      t.string :bioguide_id
      t.string :bill_id
      t.string :vote

      t.timestamps
    end
  end
end
