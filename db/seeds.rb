# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Senator.destroy_all
Senator.create(bioguide_Id:"M001", first_name:"Jerk", last_name:"Face", state: "CA", party: "R")
Senator.create(bioguide_Id:"M002", first_name:"What", last_name:"UP", state: "CA", party: "D")
Senator.create(bioguide_Id:"D001", first_name:"Bradon", last_name:"Kwong", state: "GA", party: "D")
Senator.create(bioguide_Id:"D002", first_name:"Brian", last_name:"Purcell", state: "LA", party: "D")

Committee.destroy_all
Committee.create(name: "Justice League", committee_id: 'X001', cmembers_id: ['M001','D002'])


