class ProdCommitteesController < ApplicationController

  respond_to :json

  def index
  	@links = ProdCommittee.all
  	respond_with @links, each_serializer: ProdCommitteeSerializer    
  end

end
