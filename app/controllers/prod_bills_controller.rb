class ProdBillsController < ApplicationController
 
 respond_to :json

  def index
    @bills = ProdBill.all
    respond_with @bills, each_serializer: ProdBillSerializer    
  end
end
