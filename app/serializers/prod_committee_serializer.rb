class ProdCommitteeSerializer < ActiveModel::Serializer
  attributes :bioguide_id, :committee_id, :committee_name, :senator_name
end
