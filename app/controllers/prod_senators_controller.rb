class ProdSenatorsController < ApplicationController
  def show
    @senators = render json: ProdSenator.all
  end

end
