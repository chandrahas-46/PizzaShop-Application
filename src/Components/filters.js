import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterPizza } from "../Redux/Actions/pizzaActions";

const Filters = () => {
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState("all");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchKey || category) {
      dispatch(filterPizza(searchKey, category));
    }
  };

  return (
    <div className="p-2 bg-blue-500">
      <div className="flex justify-center">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md mr-4"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search pizza"
          required
        />
        <select
          className="border border-gray-300 p-2 rounded-md mr-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400"
          onClick={handleSearch} 
        >
          Search
        </button>
        
        {/* <button
          className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400 ${
            !(searchKey || category !== "all") && "opacity-50 cursor-not-allowed"}`}
          onClick={handleSearch} 
          disabled={!(searchKey || category !== "all")}
        >
          Search
        </button> */}
      </div>
    </div>
  );
};

export default Filters;
