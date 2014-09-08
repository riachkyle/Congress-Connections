require 'rails_helper'

RSpec.describe ProdVotesController, :type => :controller do

	describe 'GET #index' do
		
		before do
			get :index, format: :json
		end

		it "should succeed" do
			expect(response).to be_success
		end

		it "should assign @votes to be all votes" do
			expect(assigns(:votes).to_json include(ProdVote.all))
		end

	end

end
