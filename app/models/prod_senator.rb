class ProdSenator < ActiveRecord::Base
  validates_presence_of :senator_name, :state_name, :bioguide_id, :party, :term_start
  validates_length_of :term_start, is: 10, message: "date should be 10 characters long (YYYY-MM-DD)"
end


