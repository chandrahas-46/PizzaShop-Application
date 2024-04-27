import axios from "axios";
import swal from "sweetalert";

export const getAllPizzas = () => async (dispatch) => {
    dispatch({ type: "GET_PIZZAS_REQUEST" });
    try {
        // const response = await axios.get("https://pizzashop-api-xk6s.onrender.com/api/products");
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products`);
        // console.log("PizzaACTIONS: ",response.data.products);
        // localStorage.removeItem("cartItems")
        dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data.products });
    } 
    catch (err) {
        dispatch({ type: "GET_PIZZAS_FAIL", payload: err });
    }
};

// *****************************
// Action constants.
// export const GET_PIZZAS_REQUEST="GET PIZZAS REQUEST";
// export const GET_PIZZAS_SUCCESS="GET PIZZAS SUCCESS";
// export const GET_PIZZAS_FAIL="GET PIZZAS FAIL";

// Action Creators
// export const getPizzaRequest = (payload)=>({payload, type: GET_PIZZAS_REQUEST});
// export const getPizzaSuccess = (payload)=>({payload, type: GET_PIZZAS_SUCCESS});
// export const getPizzaFail = (payload)=>({payload, type: GET_PIZZAS_FAIL});


// ************************ ADMIN *********************************************
export const addPizza = (pizza) => async (dispatch) => {
    dispatch({ type: "ADD_PIZZAS_REQUEST" });
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products`, pizza);
        dispatch({ type: "ADD_PIZZAS_SUCCESS" });
    } 
    catch (err) {
        dispatch({ type: "ADD_PIZZAS_FAIL", payload: err });
    }
};


export const getPizzaById = (pizzaId) => async (dispatch) => {
    dispatch({ type: "GET_PIZZABYID_REQUEST" });
    try {
        // console.log("pizzaAction>>pizzaId: ", pizzaId);
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products/${ pizzaId }`);
        // console.log("PizzaAction_getPizzaById: ", response.data.product);
        dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: response.data.product });
    } 
    catch (err) {
        dispatch({ type: "GET_PIZZABYID_FAIL", payload: err });
    }
};


export const updatePizza = (pizzaId, updatedPizza) => async (dispatch) => {
    dispatch({ type: "UPDATE_PIZZABYID_REQUEST" });
    try {
        // if {updatedPizza} pass with curly braces then [On server fetch data using :::: req.body.updatedPizza otherwise use ::: req.body]
        const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/products/${ pizzaId }`, {updatedPizza});
        // console.log("PizzaAction_updatePizza: ", response.data.Product);
        dispatch({ type: "UPDATE_PIZZABYID_SUCCESS", payload: response.data.product });
        window.location.href = "/admin/pizzalist";
    } 
    catch (err) {
        dispatch({ type: "UPDATE_PIZZABYID_FAIL", payload: err });
    }
};
  
export const deletePizza = (pizzaId) => async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/products/${ pizzaId }`);
      swal("Pizza Deleted Succss!", "success");
      window.location.href = "/admin/pizzalist";
      // console.log(res);
    } 
    catch (error) {
      swal("Errro While Deleteing Pizza");
    }
};
 
// ##################################################################################
export const filterPizza = (searchkey, category) => async (dispatch) => {
    let filteredPizza;
    dispatch({ type: "GET_PIZZAS_REQUEST" });
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products`);
      const pizzas = res.data.products;
      filteredPizza = pizzas;
      if(searchkey) {
        filteredPizza = pizzas.filter((pizza) =>
            pizza.name.toLowerCase().includes(searchkey.toLowerCase())
        );
      }
      
    //   console.log("PizzaAction_filterPizza_res: ", filteredPizza, " # ", searchkey);
      if (category !== "all") {
        filteredPizza = pizzas.filter((pizza) => 
            pizza.type.toLowerCase().startsWith(category.toLowerCase().slice(0, 3))
            // pizza.type.toLowerCase() === category.toLowerCase()
        );
      }
      dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizza });
    //   console.log("PizzaAction_filterPizza: ", filteredPizza);
    } 
    catch (error) {
      dispatch({ type: "GET_PIZZAS_FAIL", payload: error });
    }
};