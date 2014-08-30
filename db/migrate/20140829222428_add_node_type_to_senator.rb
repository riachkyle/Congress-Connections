class AddNodeTypeToSenator < ActiveRecord::Migration
  def change
    add_column :senators, :node_type, :string
  end
end
