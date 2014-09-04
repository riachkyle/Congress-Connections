require 'rails_helper'

RSpec.describe ProdSenatorsController, :type => :controller do

	describe 'GET #index' do
		
		before do
			get :index, format: :json
		end

		it "should succeed" do
			expect(response).to be_success
		end

		it "should assign @senators to be all senators" do
			expect(assigns(:senators).to_json include(ProdSenator.all))
		end

	end

end
