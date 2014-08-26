class CreatePractices < ActiveRecord::Migration
  def change
    create_table :practices do |t|
      t.string :too
      t.string :many
      t.string :newbs
      t.string :here

      t.timestamps
    end
  end
end
