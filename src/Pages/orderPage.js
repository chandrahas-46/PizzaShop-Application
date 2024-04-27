import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../Redux/Actions/orderAction";
import { Loader } from "../Components/loader";
import { Error } from "../Components/error";

const Order = () => {
    const orderState = useSelector((state) => state.getUserOrdersReducer);
    const { loading, error, orders } = orderState;
    // console.log("orderPage: ", orders)
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch]);

    return (
        <>
        <h1 className="text-center ">Your Orders </h1>
        {loading && <Loader />}
        {error && <Error error="something went wrong" />}
        {orders &&
            orders.map((order, index) => (
                <div key={index} className="container border p-4 bg-light">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/3">
                            <h4><b>Items :</b></h4>
                            {order.orderItems.map((item, index) => (
                                <h6 key={index}>
                                    {item.name} 
                                    {/* [{item.varient}] * {item.quantity} = {item.price} */}
                                </h6>
                            ))}
                        </div>
                        <div className="w-full md:w-1/3">
                            <h4><b>Address :</b></h4>
                            <h6>Street : {order.shippingAddress.street}</h6>
                            <h6>City : {order.shippingAddress.city}</h6>
                            <h6>PinCode : {order.shippingAddress.pincode}</h6>
                            <h6>Country : {order.shippingAddress.country}</h6>
                        </div>
                        <div className="w-full md:w-1/3">
                            <h4><b>Order Info :</b></h4>
                            <h6>Order Amount : {order.orderAmount}</h6>
                            <h6>Transaction id : {order.transactionId}</h6>
                            <h6>Order id : {order._id}</h6>
                        </div>
                    </div>
                </div>
            ))
        }
        </>
    );
};

export default Order;
