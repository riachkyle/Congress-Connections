require 'rails_helper'

describe ProdCommittee do
  it "is a valid senator committee link with a name, state name, bioguide id, term_start and party" do
    committee = ProdCommittee.new(bioguide_id: "F000062", committee_id: "SCNC", committee_name: "United States Senate Caucus on International Narcotics Control", senator_name: "Dianne Feinstein")
    expect(committee).to be_valid
  end

  it "is not valid without a bioguide_id" do
    committee = ProdCommittee.new(committee_id: "SCNC", committee_name: "United States Senate Caucus on International Narcotics Control", senator_name: "Dianne Feinstein")
    expect(committee).to be_invalid   
  end  

  it "is not valid without a committee_id" do
    committee = ProdCommittee.new(bioguide_id: "F000062", committee_name: "United States Senate Caucus on International Narcotics Control", senator_name: "Dianne Feinstein")
    expect(committee).to be_invalid   
  end  

  it "is not valid without a committee name" do
    committee = ProdCommittee.new(bioguide_id: "F000062", committee_id: "SCNC", senator_name: "Dianne Feinstein")
    expect(committee).to be_invalid   
  end  

  it "is not valid without a senator name" do
    committee = ProdCommittee.new(bioguide_id: "F000062", committee_id: "SCNC", committee_name: "United States Senate Caucus on International Narcotics Control")
    expect(committee).to be_invalid   
  end 

  it "is not a committee senator if committee_id is NOT 4 characters long (eg SCNC)" do
    committee = ProdCommittee.new(bioguide_id: "F000062", committee_id: "XX", committee_name: "United States Senate Caucus on International Narcotics Control", senator_name: "Dianne Feinstein")
    expect(committee).to be_invalid
  end

  it "is not a valid committee if bioguide_id is NOT 7 characters long (eg F000062)" do
    committee = ProdCommittee.new(bioguide_id: "F0000", committee_id: "SCNC", committee_name: "United States Senate Caucus on International Narcotics Control", senator_name: "Dianne Feinstein")
    expect(committee).to be_invalid
  end

end
