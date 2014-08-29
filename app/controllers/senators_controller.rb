class SenatorsController < ApplicationController

  def index
    
  end

  def show
	@senators = render json: Senator.all
  end

end
