class CreateSenators < ActiveRecord::Migration
  def change
    create_table :senators do |t|
      t.string :bioguide_Id
      t.string :first_name
      t.string :last_name
      t.string :state
      t.string :party
      t.references :committee, index: true

      t.timestamps
    end
  end
end
