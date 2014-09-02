class RemoveTypeToSenator < ActiveRecord::Migration
  def change
    remove_column :senators, :type, :string
  end
end
