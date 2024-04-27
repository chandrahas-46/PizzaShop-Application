import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { local_pizzas } from '../Assets/pizza_data';
// *********************************************
// import axios from "axios";
// import { getPizzaRequest, getPizzaSuccess, getPizzaFail } from '../Redux/Actions/pizzaActions';

import { getAllPizzas } from '../Redux/Actions/pizzaActions';
import PizzaCard from '../Components/Home/pizzaCard';
import { Loader } from '../Components/loader';
import { Error } from '../Components/error';
import Filters from '../Components/filters';

const Home = () => {
    const dispatch = useDispatch();

    const pizzastate = useSelector((state) => state.getAllPizzaReducer);
    const { loading, pizzas, error } = pizzastate;
    // console.log("HOME## ",pizzas);

    useEffect(() => {
        dispatch(getAllPizzas()); 
    }, [dispatch]);

    // ***************************************************
    // useEffect(() => {
    //     const fetchData = async () => {
    //         dispatch(getPizzaRequest());
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products`);
    //             dispatch(getPizzaSuccess(response.data.products));
    //         } catch (err) {
    //             console.log(err);
    //             dispatch(getPizzaFail(err));
    //         }
    //     };

    //     fetchData(); // Call the async function immediately
    // }, [dispatch]);

    return (
        <>
            <div className="container mx-auto px-4 my-8 w-3/4">
                {loading ? 
                    // (<h1>Loading...</h1>) 
                    <Loader />
                    : error ? 
                    (
                    // <h1>Error While Fetching Pizzas</h1>
                    <Error error="Error while fetching pizzas" />
                    ) : (
                    <>
                        <div>
                            <b>To Control Admin Panel Login with:</b>
                            <h5><b>Email Id:</b> admin@gmail.com</h5>
                            <h5><b>Password:</b> admin</h5>
                        </div>
                        <div className="mb-4">
                            <Filters />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {pizzas.map((pizza, index) => (
                            <div key={index} className="md:col-span-1">
                                <PizzaCard pizza={pizza} />
                            </div>
                            ))}
                        </div>
                    </>
                )}                
            </div>
        </>
    );
}

export default Home;
