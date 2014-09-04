class ProdSenatorsController < ApplicationController
  
  respond_to :json

  def index
    @senators = ProdSenator.all.sort_by do |s|
    	s[:party]
    end
    respond_with @senators, each_serializer: ProdSenatorSerializer
  end

end
