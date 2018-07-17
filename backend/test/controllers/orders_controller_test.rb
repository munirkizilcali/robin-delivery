require 'test_helper'

class OrdersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @order = orders(:one)
  end

  test "should get index" do
    get orders_url, as: :json
    assert_response :success
  end

  test "should create order" do
    assert_difference('Order.count') do
      post orders_url, params: { order: { courier_id: @order.courier_id, delivery_time: @order.delivery_time, driver_assigned_time: @order.driver_assigned_time, estimated_duration: @order.estimated_duration, order_address: @order.order_address, order_location: @order.order_location, order_time: @order.order_time, pickup_time: @order.pickup_time, restaurant_id: @order.restaurant_id, status: @order.status, tip_amount: @order.tip_amount, user_id: @order.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show order" do
    get order_url(@order), as: :json
    assert_response :success
  end

  test "should update order" do
    patch order_url(@order), params: { order: { courier_id: @order.courier_id, delivery_time: @order.delivery_time, driver_assigned_time: @order.driver_assigned_time, estimated_duration: @order.estimated_duration, order_address: @order.order_address, order_location: @order.order_location, order_time: @order.order_time, pickup_time: @order.pickup_time, restaurant_id: @order.restaurant_id, status: @order.status, tip_amount: @order.tip_amount, user_id: @order.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy order" do
    assert_difference('Order.count', -1) do
      delete order_url(@order), as: :json
    end

    assert_response 204
  end
end
