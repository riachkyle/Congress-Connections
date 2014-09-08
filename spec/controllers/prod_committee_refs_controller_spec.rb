require 'rails_helper'

RSpec.describe ProdCommitteeRefsController, :type => :controller do

	describe 'GET #index' do
		
		before do
			get :index, format: :json
		end

		it "should succeed" do
			expect(response).to be_success
		end

		it "should assign @committees to be all committees" do
			expect(assigns(:committees).to_json include(ProdCommitteeRef.all))
		end

	end
	
end
