class AddMembersToSenator < ActiveRecord::Migration
  def change
    add_column :senators, :members, :integer, :array => true
  end
end
