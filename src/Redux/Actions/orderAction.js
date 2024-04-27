import axios from "axios";

export const placeOrder = (token, subTotal) => async (dispatch, getState) => {
    dispatch({ type: "PLACE_ORDER_REQUEST" });
    const currentUser = getState().loginUserReducer.currentUser.currentUserData;
    const cartItems = getState().cartReducer.cartItems;
    try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/order`, {
            token,
            subTotal,
            currentUser,
            cartItems,
        });
        dispatch({ type: "PLACE_ORDER_SUCCESS" });
        console.log("Order_ACTION: ",res);
    } 
    catch (error) {
        dispatch({ type: "PLACE_ORDER_FAIL" });
        console.log(error);
    }
};

export const getUserOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser.currentUserData;
    dispatch({
        type: "USER_ORDER_REQUEST",
    });
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/order/getUserOrder`, {userid: currentUser._id,});
        // console.log("orderActions_getUserOrders: ",response);
        dispatch({ type: "USER_ORDER_SUCCESS", payload: response.data });
    } 
    catch (error) {
        dispatch({ type: "USER_ORDER_FAIL", payload: error });
    }
};


// **************** ADMIN ********************
export const getAllOrders = () => async (dispatch, getState) => {
  // const currentUser = getState().loginUserReducer.currentUser;
    dispatch({
        type: "ALL_ORDER_REQUEST",
    });
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/order/alluserorder`);
        // console.log("orderActions_getAllOrders: ",response.data);
        dispatch({ type: "ALL_ORDER_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "ALL_ORDER_FAIL", payload: error });
    }
};

export const deliverOrder = (orderid) => async (dispatch, getState) => {
  // const currentUser = getState().loginUserReducer.currentUser;
    dispatch({ type: "GET_ALL_ORDER_REQUEST",});
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/order/deliverorder`, { orderid });
        alert("Deliverd Success");
        const orders = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/order/alluserorder`);
        dispatch({ type: "GET_ALL_ORDER_SUCCESS", payload: orders.data });
        window.location.href = "/admin/orderlist";
    } 
    catch (error) {
        dispatch({ type: "GET_ALL_ORDER_FAIL", payload: error });
    }
};