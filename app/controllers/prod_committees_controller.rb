class ProdCommitteesController < ApplicationController

  def show
    @committees = render json: ProdCommittee.all      
  end
end
