import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams hook
import { getPizzaById, updatePizza } from "../../Redux/Actions/pizzaActions";
import { Loader } from "../loader";
import { Error } from "../error";

const EditPizza = () => {
  const [name, setName] = useState("");
  const [smallPrice, setSmallPrice] = useState();
  const [largePrice, setLargePrice] = useState();
  const [mediumPrice, setMediumPrice] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const { pizzaId } = useParams(); // Access pizzaId directly using useParams hook
  const dispatch = useDispatch();
  
  const getPizzaByIdState = useSelector((state) => state.getPizzaByIdReducer);
  const { error, pizza } = getPizzaByIdState;
  const updatePizzaState = useSelector((state) => state.updatePizzaByIdReducer);
  const { updateloading } = updatePizzaState;

  // useEffect(() => {
  //   dispatch(getPizzaById(pizzaId));
  // }, [dispatch, pizzaId])
  
  useEffect(() => {
    if (!pizza || pizza._id !== pizzaId) {
      dispatch(getPizzaById(pizzaId));
    } 
    else {
      setName(pizza.name);
      setDescription(pizza.tags[0]);
      setCategory(pizza.type);
      setImage(pizza.image);
      setSmallPrice(pizza.price.size['small']);
      setMediumPrice(pizza.price.size['medium']);
      setLargePrice(pizza.price.size['large']);
    }
  }, [dispatch, pizzaId, pizza]);
  
  const submitForm = (e) => {
    e.preventDefault();
    const updatedPizza = {
      // _id: pizzaId,
      name,
      image,
      tags: description,
      type: category,
      price: {
        size: {
          small: parseInt(smallPrice),
          medium: parseInt(mediumPrice),
          large: parseInt(largePrice),
        }
      },
    };
    // console.log("editPizza_submitForm: ", updatedPizza);
    dispatch(updatePizza(pizzaId, updatedPizza));
  };

  return (
    <div>
      {/* <h1>Edit Pizza</h1> */}
      {updateloading && <Loader />}
      {error && <Error error="add new pizza error" />}
      <form onSubmit={submitForm} className="bg-gray-100 p-4">
        <div className="mb-3">
          <label htmlFor="name" className="block">Name</label>
          <input 
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="mb-3">
            <label htmlFor="smallPrice" className="block">
              Small Price
            </label>
            <input
              type="text"
              id="smallPrice"
              value={smallPrice}
              onChange={(e) => setSmallPrice(e.target.value)}
              placeholder="Enter Small Price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mediumPrice" className="block">
              Medium Price
            </label>
            <input
              type="text"
              id="mediumPrice"
              value={mediumPrice}
              onChange={(e) => setMediumPrice(e.target.value)}
              placeholder="Enter Medium Price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="largeprice" className="block">
              Large Price
            </label>
            <input
              type="text"
              id="largeprice"
              value={largePrice}
              onChange={(e) => setLargePrice(e.target.value)}
              placeholder="Enter Large Price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="image" className="block">
            Image
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Add Image URL"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="block">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="block">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Category Veg/Non-Veg"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Update Pizza
        </button>
      </form>
    </div>
  );
};
export default EditPizza;
