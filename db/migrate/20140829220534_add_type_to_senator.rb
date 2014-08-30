class AddTypeToSenator < ActiveRecord::Migration
  def change
    add_column :senators, :type, :string
  end
end
