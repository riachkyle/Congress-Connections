require 'rails_helper'

describe ProdSenator do
  it "is a valid senator with a name, state name, bioguide id, term_start and party" do
    senator = ProdSenator.new(senator_name: "Harry Reid", state_name: "Nevada", bioguide_id: 'R000146', party: 'D', term_start: '2011-01-05')
    expect(senator).to be_valid
  end

  it "is not valid without a party" do
    senator = ProdSenator.new(senator_name: "Harry Reid", state_name: "Nevada", bioguide_id: 'R000146', term_start: '2011-01-05')
    expect(senator).to be_invalid   
  end  

  it "is not valid without a name" do
    senator = ProdSenator.new(state_name: "Nevada", bioguide_id: 'R000146', party: 'D', term_start: '2011-01-05')
    expect(senator).to be_invalid   
  end  

  it "is not valid without a state name" do
    senator = ProdSenator.new(senator_name: "Harry Reid", bioguide_id: 'R000146', party: 'D', term_start: '2011-01-05')
    expect(senator).to be_invalid   
  end  

  it "is a valid senator if term_start is 10 characters long (YYYY-MM-DD)" do
    senator = ProdSenator.new(senator_name: "Harry Reid", state_name: "Nevada", bioguide_id: 'R000146', party: 'D', term_start: '2011-01-05')
    expect(senator).to be_valid
  end

  it "is not a valid senator if term_start is NOT 10 characters long (YYYY-MM-DD)" do
    senator = ProdSenator.new(senator_name: "Harry Reid", state_name: "Nevada", bioguide_id: 'R000146', party: 'D', term_start: '2011-01-0')
    expect(senator).to be_invalid
  end


  end
