import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { getAllPizzaReducer, addPizzaReducer, getPizzaByIdReducer, updatePizzaByIdReducer } from "./Redux/Reducers/pizzaReducer";
import { cartReducer } from "./Redux/Reducers/cartReducer";
import { registerUserReducer, loginUserReducer, getAllUsersReducer } from "./Redux/Reducers/userReducer";
import { placeOrderReducer, getUserOrdersReducer, allUserOrdersReducer } from "./Redux/Reducers/orderReducer";

// Combined all reducers
const rootReducer = combineReducers({
    getAllPizzaReducer: getAllPizzaReducer,
    cartReducer: cartReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    placeOrderReducer: placeOrderReducer,
    getUserOrdersReducer: getUserOrdersReducer,
    addPizzaReducer: addPizzaReducer,
    getPizzaByIdReducer: getPizzaByIdReducer,
    updatePizzaByIdReducer: updatePizzaByIdReducer,
    allUserOrdersReducer: allUserOrdersReducer,
    getAllUsersReducer: getAllUsersReducer
});

// *** Get cartItems using [localStorage] ***
// const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
let cartItems;
const storedCartItems = localStorage.getItem("cartItems");

if (!storedCartItems || storedCartItems.trim() === "") {
    cartItems = [];
}
else {
    cartItems = JSON.parse(storedCartItems);
}
const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null;

// cartItems = {
//     image: "https://cdn.dummyjson.com/recipe-images/1.webp",
//     name: "Burger Pizza",
//     price: {size: {small: 100, medium: 200, large: 300}},
//     productTotal: 100,
//     quantity: 1,
//     size: "small",
//     _id: "65e221cba2ce041be19ad3e6"
// }

// currentUser = {
//     currentUserData: {
//         name: "chand", email: "c@gmail.com", type: "Customer", _id: "6612169f85d92bf16ce4f5e8"
//     },
//     message: "User Login successfully",
//     success: true,
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NjEyMTY5Zjg1ZDkyYmYxNmNlNGY1ZTgiLCJlbWFpbCI6ImNAZ21haWwuY29tIiwiaWF0IjoxNzEyNjM3NjM3LCJleHAiOjE3MTI2NDEyMzd9.mvITvokyS6YTiKAxUIT1tXe2OIYy3vhfxvJw_ErVrJ4"
// }

const initialState = {
    cartReducer: {
        cartItems: cartItems,
    },
    loginUserReducer: {
        currentUser: currentUser,
    },
};

// const initialState = {};
const middleware = [thunk];

// creating store from reducers
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;