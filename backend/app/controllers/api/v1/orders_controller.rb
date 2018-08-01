class Api::V1::OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]

  # GET /orders
  def index
    if current_user.user_type == 'customer'
      @orders = current_user.orders
    else
      @orders = current_user.deliveries
    end
    render json: @orders
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = Order.new(order_params)

    if @order.save
      @order.ask_courier(User.find_by(user_type: 'courier'))
      render json: @order, status: :created
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    if order_params[:status] == 'reject'
      @order.ask_courier(User.where("user_type = ? and id != ?", 'courier', current_user.id).first)
      render json: @order
    elsif order_params[:status] == 'courierSet'
      @order.assign_courier
      render json: @order
    elsif order_params[:status] == 'pickedUp'
      @order.pick_up
      render json: @order
    elsif order_params[:status] == 'completed'
      @order.complete
      render json: @order
    else 
      if @order.update(order_params)
        render json: @order
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    end

  end

  # DELETE /orders/1
  def destroy
    @order.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:restaurant_id, :user_id, :courier_id, :order_location, :order_address, :order_time, :pickup_time, :delivery_time, :estimated_duration, :status, :driver_assigned_time, :tip_amount)
    end
end
