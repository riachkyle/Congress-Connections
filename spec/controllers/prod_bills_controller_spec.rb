require 'rails_helper'

RSpec.describe ProdBillsController, :type => :controller do

	describe 'GET #index' do

		before do
			get :index, format: :json
		end

		it "should succeed" do
			expect(response).to be_success
		end

		it "should assign @bills to be all bills" do
			expect(assigns(:bills).to_json include(ProdBill.all))
		end

	end

end
