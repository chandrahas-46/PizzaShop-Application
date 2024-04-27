import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../Redux/Actions/cartAction';  //action

const PizzaCard = ({pizza}) => {
    const [size, setSize] = useState("small");
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    // After clicking button - Item will add into CART
    const addToCartHandler = () => {
        dispatch(addToCart(pizza, quantity, size));
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <>
        <div className="w-[100%] max-w-sm rounded overflow-hidden shadow-lg mx-auto bg-white">
            <img className="w-full h-40 object-fill bg-slate-300 cursor-pointer" src={pizza.image} alt="Card" onClick={handleShowModal} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{pizza.name}</div>
                <hr className="my-2" />
                <div className="text-gray-700 text-base flex">
                    <div className="w-1/2">
                        <h6 className="font-bold text-sm">Size</h6>
                        <select className="w-3/4" value={size} onChange={(e) => setSize(e.target.value)} required>
                            {/* <option value="">Select Size</option> */}
                            <option value="small">small</option>
                            <option value="medium">medium</option>
                            <option value="large">large</option>
                        </select>
                    </div>
                    <div className="w-1/2">
                        <h6 className="font-bold text-sm">Quantity</h6>
                        <select className="w-1/2" value={quantity} onChange={(e) => setQuantity(e.target.value)} required>
                            {/* <option value="">Select Quantity</option> */}
                            {[...Array(10).keys()].map((v, i) => (
                                <option key={i + 1} value={i + 1}> {i + 1} </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <div className="flex justify-between">
                    <div className="w-1/2">Price : &#8377;{pizza.price.size[size] * quantity}</div>
                    <div className="w-1/2">
                        <button onClick={addToCartHandler} className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-12 rounded">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* modal */}
        {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <img className="h-full w-full object-cover" src={pizza.image} alt="Pizza" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{pizza.name}</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{pizza.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button onClick={handleCloseModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}

export default PizzaCard;
