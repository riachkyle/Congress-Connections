class CommitteesController < ApplicationController
  def index 
    @committees = Committee.all
    @senators = Senator.all
  
  end
end
