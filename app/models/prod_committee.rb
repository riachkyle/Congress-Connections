class ProdCommittee < ActiveRecord::Base
  validates_presence_of :bioguide_id, :committee_id, :committee_name, :senator_name
  validates_length_of :bioguide_id, is: 7, message: "bioguide_id should be 7 characters long"
  validates_length_of :committee_id, is: 4, message: "committee_id should be 4 characters long"
end
