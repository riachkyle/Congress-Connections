class AddNodeTypeToCommittee < ActiveRecord::Migration
  def change
    add_column :committees, :node_type, :string
  end
end
