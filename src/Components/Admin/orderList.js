import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, deliverOrder } from "../../Redux/Actions/orderAction";
import {Loader} from "../loader";
import {Error} from "../error";

const OrderList = () => {
  const allOrdersState = useSelector((state) => state.allUserOrdersReducer);
  const { loading, orders, error } = allOrdersState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Lists</h1>
      {loading && <Loader />}
      {error && <Error error="Admin Order req fail" />}
      <table className="w-full border-collapse border border-gray-800">
        <thead>
          <tr>
            <th className="border border-gray-800 px-4 py-2">Order Id</th>
            <th className="border border-gray-800 px-4 py-2">Email</th>
            {/* <th className="border border-gray-800 px-4 py-2">User ID</th> */}
            <th className="border border-gray-800 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-800 px-4 py-2">Amount</th>
            <th className="border border-gray-800 px-4 py-2">Date</th>
            <th className="border border-gray-800 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td className="border border-gray-800 px-4 py-2">{order._id}</td>
                <td className="border border-gray-800 px-4 py-2">{order.email}</td>
                {/* <td className="border border-gray-800 px-4 py-2">{order.userid}</td> */}
                <td className="border border-gray-800 px-4 py-2">{order.transactionId}</td>
                <td className="border border-gray-800 px-4 py-2">Rs {order.orderAmount}/-</td>
                <td className="border border-gray-800 px-4 py-2">{order.createdAt.substring(0, 10)}</td>
                <td className="border border-gray-800 px-4 py-2">
                  {order.isDeliverd ? (
                    <span className="text-green-900 font-bold">Delivered</span>
                  ) : (
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                      onClick={() => {
                        dispatch(deliverOrder(order._id));
                      }}
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
