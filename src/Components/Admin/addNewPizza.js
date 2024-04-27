import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../../Redux/Actions/pizzaActions";
import { Loader } from "../loader";
import { Error } from "../error";
import { Success } from "../Success";

const AddNewPizza = () => {
  const [name, setName] = useState("");
  const [smallPrice, setSmallPrice] = useState();
  const [largePrice, setLargePrice] = useState();
  const [mediumPrice, setMediumPrice] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const addPizzaState = useSelector((state) => state.addPizzaReducer);
  const { loading, error, success } = addPizzaState;

  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    const pizza = {
      name,
      image,
      tags: [description],
      type: category,
      price: {
        size: {
          small: parseInt(smallPrice),
          medium: parseInt(mediumPrice),
          large: parseInt(largePrice),
        }
      },
    };
    // console.log("AddNewPizza: ", pizza);
    dispatch(addPizza(pizza));
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Error error="add new pizza error" />}
      {success && <Success success="Pizza Added Successfully" />}
      <form onSubmit={submitForm} className="bg-gray-100 p-4">
        <div className="mb-3">
          <label htmlFor="name" className="block">
            Name
          </label>
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
            <label htmlFor="largePrice" className="block">
              Large Price
            </label>
            <input
              type="text"
              id="largePrice"
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
          Add New
        </button>
      </form>
    </div>
  );
};
export default AddNewPizza;
