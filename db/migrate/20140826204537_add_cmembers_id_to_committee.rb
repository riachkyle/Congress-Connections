class AddCmembersIdToCommittee < ActiveRecord::Migration
  def change
    add_column :committees, :cmembers_id, :string, :array => true
  end
end
