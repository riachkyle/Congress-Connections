class ProdCommitteeRef < ActiveRecord::Base
  validates_presence_of :committee_id, :committee_name, :committee_seq_id
  validates_numericality_of :committee_seq_id, message: "committee sequence id should be a number"
end
