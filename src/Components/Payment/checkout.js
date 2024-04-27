import React from "react";
import StripeCheckout from "react-stripe-checkout";

import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../Redux/Actions/orderAction";
import { Loader } from "../loader";
import { Success } from "../Success";
import { Error } from "../error";

const Checkout = ({ subTotal }) => {
    const orderState = useSelector((state) => state.placeOrderReducer);
    const { loading, error, success } = orderState;
    const dispatch = useDispatch();

    const tokenHandler = (token) => {
        // Generate [token] by stripe [StripeCheckout] component
        // token_example = {
        //     card: {id: 'card_1P3iNbSBi92n37icTqAk7cRy', object: 'card', address_city: 'CHUNAR', address_country: 'India', address_line1: 'VILL&POST-BAHUAR', …},
        //     client_ip: "223.225.64.209",
        //     created: 1712683364,
        //     email: "chandra@gmail.com",
        //     id: "tok_1P3iNcSBi92n37icrr979Qez",
        //     livemode: false,
        //     object: "token",
        //     type: "card",
        //     used: false
        // }
    
        dispatch(placeOrder(token, subTotal));
        console.log("CheckoutTOKEN: ",token);
    };

    return (
        <>
        {loading && <Loader />}
        {error && <Error error="something went wrong" />}
        {success && <Success success="order placed success" />}

        <StripeCheckout
            amount={subTotal * 100}
            shippingAddress
            token={tokenHandler}
            stripeKey="pk_test_51P3NP3SBi92n37icTZDxLylOBiKmngKnfCkfO2Dkr0Kz0Vy1h7jQus9JYi7i1Mncbny1dTjq8mvrBRVlH3Xqfcdy00G5THEolh"
            currency="INR"
        >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Pay Now
            </button>
        </StripeCheckout>
        </>
    );
};

export default Checkout;
