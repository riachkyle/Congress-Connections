require 'rails_helper'

describe ProdCommitteeRef do
  it "is a valid committee with a committee id, committee name, and committee sequence id" do
    committeeref = ProdCommitteeRef.new(committee_id: "SSVA", committee_name: "Senate Committee on Veterans' Affairs", committee_seq_id: 21)
    expect(committeeref).to be_valid
  end

  it "is not valid without committee id" do
    committeeref = ProdCommitteeRef.new(committee_name: "Senate Committee on Veterans' Affairs", committee_seq_id: 21)
    expect(committeeref).to be_invalid
  end 

   it "is not valid without committee name" do
    committeeref = ProdCommitteeRef.new(committee_id: "SSVA", committee_seq_id: 21)
    expect(committeeref).to be_invalid
  end 

   it "is not valid without committee sequence id" do
    committeeref = ProdCommitteeRef.new(committee_id: "SSVA", committee_name: "Senate Committee on Veterans' Affairs")
    expect(committeeref).to be_invalid
  end 

  it "is not a valid committee if committee sequence id is NOT a number" do
    committeeref = ProdCommitteeRef.new(committee_id: "SSVA", committee_name: "Senate Committee on Veterans' Affairs", committee_seq_id: 'twenty-one')
    expect(committeeref).to be_invalid
  end

end
