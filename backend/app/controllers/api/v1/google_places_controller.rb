class Api::V1::GooglePlacesController < ApplicationController

  def index
    output = GooglePlace.nearby_restaurants(params[:location], params[:radius])
    render json: output
  end

end