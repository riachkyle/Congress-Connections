class ProdSenatorsController < ApplicationController
  
  respond_to :json

  def index
    @senators = ProdSenator.all
    respond_with @senators, each_serializer: ProdSenatorSerializer
  end

end
