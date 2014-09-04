class ProdCommitteeRefsController < ApplicationController

	respond_to :json

	def index
     @committees = ProdCommitteeRef.all
     respond_with @committees, each_serializer: ProdCommitteeRefSerializer   
  end

end
