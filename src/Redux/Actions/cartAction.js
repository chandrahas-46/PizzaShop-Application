export const addToCart = (pizza, quantity, size) => (dispatch, getState) => {
    var cartItem = {
        name: pizza.name,
        _id: pizza._id,
        image: pizza.image,
        size: size,
        quantity: Number(quantity),
        price: pizza.price,
        productTotal: pizza.price.size[size] * quantity,
        // price: pizza.prices[0][varient] * quantity,
    };

    // *** Stored cartItems using [localStorage] ***
    // [IMP - why cartItems data can not be fetched using {useSelector((state) => state.cartReducer)} :: [ANS] Hooks can only be called inside of the body of a function component.]
    // [ 'getState()' is a function provided by the Redux store. It allows you to retrieve the current state of your application]
    if (cartItem.quantity > 10) {
        alert("you Can only add 10 pizzas");
    } 
    else {
        if (cartItem.quantity < 1) {
            dispatch({ type: "DELETE_FROM_CART", payload: pizza });
            const cartItems = getState().cartReducer.cartitems;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } 
        else {
            dispatch({ type: "ADD_TO_CART", payload: cartItem });
            // cartItems is an array and stored all the items so we need to take data from store
            localStorage.setItem(
                "cartItems",
                JSON.stringify(getState().cartReducer.cartItems)
            );
        }
    }
};

export const deleteFromCart = (pizza) => (dispatch, getState) => {
    dispatch({ type: "DELETE_FROM_CART", payload: pizza });
    const cartItems = getState().cartReducer.cartitems;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};


// [ACTIONS :: ADD_TO_CART, DELETE_FROM_CART]