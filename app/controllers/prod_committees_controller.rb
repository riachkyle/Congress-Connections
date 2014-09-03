class ProdCommitteesController < ApplicationController

  def show
    @committees = render json: Committee.all      
  end
end
