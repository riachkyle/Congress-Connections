class ProdVotesController < ApplicationController


 respond_to :json

  def index
    @votes = ProdVote.all
    respond_with @votes, each_serializer: ProdVoteSerializer    
  end
end
