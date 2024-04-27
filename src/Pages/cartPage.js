import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import { addToCart, deleteFromCart } from "../Redux/Actions/cartAction";
import Checkout from "../Components/Payment/checkout";

const Cart = () => {
    const cartState = useSelector((state) => state.cartReducer);
    const cartItems = cartState.cartItems;
    const dispatch = useDispatch();
    const subTotal = cartItems.reduce((x, item) => x + item.productTotal, 0);

    return (
        <>
          <div className="container mx-auto px-4">
            {/* <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">My Cart</h1>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white shadow-md p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-bold">
                      {item.name} [{item.size}]
                    </h5>
                    <FaTrash
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        dispatch(deleteFromCart(item));
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <img
                        alt={item.name}
                        src={item.image}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex flex-col justify-between">
                      <h6>
                        Price: {item.quantity} X {item.price.size[item.size]} = {item.productTotal}
                      </h6>
                      <div className="flex items-center">
                        {/* {console.log("CART:: ", item)} */}
                        <FaMinusCircle
                          className="text-red-500 cursor-pointer"
                          onClick={() => {
                            dispatch(
                              addToCart(item, item.quantity - 1, item.size)
                            );
                          }}
                        />
                        <span className="mx-2">{item.quantity}</span>
                        {/* {console.log("CART:: ", item.quantity, " & ", item.size)} */}
                        <FaPlusCircle
                          className="text-green-500 cursor-pointer"
                          onClick={() => {
                            dispatch(
                              addToCart(item, item.quantity + 1, item.size)
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8">
            <h1 className="text-2xl font-bold">Payment Info</h1>
            <h4 className="mt-4">Sub Total: RS {subTotal} /-</h4>
            <Checkout subTotal={subTotal} />
            {/* for testing: use card no.-4242424242.... */}
          </div>
        </>
    );
};

export default Cart;