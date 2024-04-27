export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            // return {
            //     ...state,
            //     cartItems: [...state.cartItems, action.payload],
            // };

            const alreadyExists = state.cartItems.find(
                (item) => item._id === action.payload._id
            );
            // [action.payload : New Record] && [item : Previous Record]
            if (alreadyExists) {
                return {
                    ...state,
                    // In cartItems add all the - [item : Previous Record] and modified new record
                    cartItems: state.cartItems.map((item) =>
                        item._id === action.payload._id ? action.payload : item
                    ),
                };
            } 
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                };
            }

        case "DELETE_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                ),
            };
        default:
            return state;
    }
  }; 