require 'rails_helper'

RSpec.describe ProdCommitteesController, :type => :controller do

	describe 'GET #index' do
		
		before do
			get :index, format: :json
		end

		it "should succeed" do
			expect(response).to be_success
		end

		it "should assign @links to be all senator-committee links" do
			expect(assigns(:links).to_json include(ProdCommittee.all))
		end

	end

end
