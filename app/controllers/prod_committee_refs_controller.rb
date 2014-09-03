class ProdCommitteeRefsController < ApplicationController

	def show
    @committees = render json: ProdCommitteeRef.all      
  end

end
