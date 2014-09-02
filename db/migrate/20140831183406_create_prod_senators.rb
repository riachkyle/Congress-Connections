class CreateProdSenators < ActiveRecord::Migration
  def change
    create_table :prod_senators do |t|
      t.string :bioguide_id
      t.string :senator_name
      t.string :chamber
      t.string :nm_first
      t.string :nm_last
      t.string :gender
      t.string :party
      t.string :state
      t.string :state_name
      t.string :rank
      t.date :tern_end
      t.date :term_start

      t.timestamps
    end
  end
end
