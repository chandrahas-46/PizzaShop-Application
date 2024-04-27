import axios from "axios";
import swal from "sweetalert";

export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/signup`, user);
        dispatch({ type: "USER_REGISTER_SUCCESS" });
    } catch (error) {
        dispatch({ type: "USER_REGISTER_FAIL", payload: error }); 
    }
};

export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/signin`, user);
        //console.log("USER_ACTION: ",response);  //[Return: config, data, headersrequest, status]
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        window.location.href = "/"; //Page refresh automatically
    } catch (error) {
        dispatch({ type: "USER_LOGIN_FAIL", payload: error });
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
};

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "GET_USERS_REQUEST" });
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/getallusers`);
        // console.log("userAction_getAllUsers: ", response.data);
        dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
    } catch (err) {
        dispatch({ type: "GET_USERS_FAIL", payload: err });
    }
};

export const deleteUser = (userid) => async (dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/deleteUser`, { userid });
        swal("User Deleted Succss!", "success");
        window.location.reload();
        // console.log(res);
    } catch (error) {
        swal("Errro While Deleteing User");
    }
};