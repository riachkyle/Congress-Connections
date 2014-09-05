class ProdSenatorSerializer < ActiveModel::Serializer
  attributes :bioguide_id, :senator_name, :state_name, :rank, :tern_end, :party, :term_start, :nm_last
end
