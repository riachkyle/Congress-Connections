class AddMembersToCommittee < ActiveRecord::Migration
  def change
    add_column :committees, :members, :integer, :array => true
  end
end
