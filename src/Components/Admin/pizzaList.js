import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { getAllPizzas, deletePizza } from "../../Redux/Actions/pizzaActions";
import { Loader } from "../loader";
import { Error } from "../error";
import { Link } from "react-router-dom";

const Pizzalist = () => {
    const dispatch = useDispatch();
    const pizzastate = useSelector((state) => state.getAllPizzaReducer);
    const { loading, pizzas, error } = pizzastate;
    // console.log("PizzaList: ", pizzas); 

    useEffect(() => {
        dispatch(getAllPizzas());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error error="Error while fetching pizzas" />
                // <Error>Error while fetching pizzas {error}</Error>
            ) : (
                <div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    S.No.
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Image
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Pizza Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Prices
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pizzas &&
                                pizzas.map((pizza, index) => (
                                    <tr key={pizza._id} className="bg-white">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {index}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={pizza.image}
                                                alt="logo"
                                                className="h-12 w-12"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {pizza.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                    
                                                Small: {pizza.price.size["small"]}
                                                <br />
                                                Medium: {pizza.price.size["medium"]}
                                                <br />
                                                Large: {pizza.price.size["large"]}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {pizza.type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row">
                                            <Link to={`/admin/editpizza/${pizza._id}`}>
                                                <AiFillEdit className="text-blue-600 mr-2 cursor-pointer" />
                                            </Link>
                                            {/* <AiFillEdit className="text-blue-600 mr-2 cursor-pointer" /> */}
                                            <AiFillDelete
                                                className="text-red-600 cursor-pointer"
                                                onClick={() => {
                                                    dispatch(deletePizza(pizza._id));
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )
            }
        </>
    );
};

export default Pizzalist;
