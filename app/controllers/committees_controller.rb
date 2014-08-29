class CommitteesController < ApplicationController
  def index 
    @committees = render json: Committee.all      
  end
end
