class SenatorsController < ApplicationController

  def index
    @senators = render json: Senator.all
  end
end
