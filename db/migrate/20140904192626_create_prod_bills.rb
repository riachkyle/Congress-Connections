class CreateProdBills < ActiveRecord::Migration
  def change
    create_table :prod_bills do |t|
      t.string :bill_id
      t.string :title

      t.timestamps
    end
  end
end
