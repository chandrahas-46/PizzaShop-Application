import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink, Outlet } from 'react-router-dom';
import { loginUser } from "../Redux/Actions/userAction";
import { registerUser } from "../Redux/Actions/userAction";
import { Loader } from "../Components/loader";
import { Success } from "../Components/Success";
import { Error } from "../Components/error";
import pizza_image from "./Pizza_shop.svg";

const Login = () => {
    const loginState = useSelector((state) => state.loginUserReducer);
    // console.log("LoginPage_state: ", loginState);
    // const { error, success, loading } = loginState;
    const { error: loginError, success: loginSuccess, loading: loginLoading } = loginState;

    const registerState = useSelector((state) => state.registerUserReducer);
    // console.log("registerState: ", registerState);
    const { error: registerError, success: registerSuccess, loading: registerLoading } = registerState;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    // console.log("isRegister: ", isRegister);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            window.location.href = "/";
        }
    }, []);

    useEffect(() => {
        if (registerSuccess) {
            setEmail("");
            setPassword("");
            setName("");
            setConfirmPassword("");
        }
        // console.log("isRegister2: ", isRegister);
    }, [registerSuccess, isRegister]);

    const handleLogin = (e) => {
        e.preventDefault();
        const user = { email, password };
        dispatch(loginUser(user));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } 
        else {
            const user = { name, email, password, confirmPassword };
            dispatch(registerUser(user));
        }
    };

    const toggleRegistration = () => {
        setIsRegister(!isRegister);
    };

    return (
        <>
        <div className="container mx-auto">
            {(loginLoading || registerLoading) && <Loader />}
            {loginSuccess && <Success success="Logged in successfully" />}
            {loginError && <Error error="Login failed. Please try again." />}
            {registerSuccess && <Success success="User registered successfully" />}
            {registerError && <Error error="Registration failed. Please try again." />}

            <form onSubmit={isRegister ? handleRegister : handleLogin}>
                <div className="container mt-32 flex mx-auto items-center justify-center">
                    <div className="left w-1/3 mx-14">
                        <img className="w-60" src={pizza_image} alt="Pizza_shop" />
                        <p className="text-3xl mx-6">Pizza is a universal language. Everyone loves it.</p>
                    </div>

                    <div className="right flex flex-col bg-white p-8 rounded-xl w-1/3 text-lg relative">
                        {isRegister && (
                                <input 
                                    className="px-4 h-12 my-2 border border-1 border-gray-200 rounded-lg outline-blue-600" 
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name" 
                                    required
                                />
                        )}

                        <input 
                            className="px-4 h-12 my-2 border border-1 border-gray-200 rounded-lg outline-blue-600" 
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address" 
                            required
                        />

                        <input 
                            className="px-4 h-12 my-2 border border-1 border-gray-200 rounded-lg outline-blue-600" 
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" 
                            required
                        />

                        {isRegister && (
                                <input 
                                    className="px-4 h-12 my-2 border border-1 border-gray-200 rounded-lg outline-blue-600" 
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password" 
                                    required
                                />
                        )}
                        
                        <button className="bg-blue-600 hover:bg-blue-700 text-white my-2 py-3 rounded-md font-bold" type="submit">
                            {isRegister ? "Register" : "Log In"}
                            {/* {isRegister ? 
                                <NavLink to="/login">
                                    Register
                                </NavLink> 
                                :
                                <NavLink to="/register">
                                    Log In
                                </NavLink> 
                            } */}
                        </button>

                        {!isRegister && (
                            <span 
                                className="text-blue-600 text-center text-sm my-2 cursor-pointer hover:underline"
                            >
                                Forgotten password?
                            </span>
                        )}

                        <hr className="my-2" />

                        <button className="bg-green-600 hover:bg-green-700 text-white my-2 py-3 rounded-md font-bold w-fit px-4 mx-auto" onClick={toggleRegistration} type="button">
                            {isRegister ? "Log In" : "Create new account"}
                            {/* {isRegister ? 
                                <NavLink to="/login">
                                    Log In
                                </NavLink> 
                                : 
                                <NavLink to="/register">
                                    Create new account
                                </NavLink> 
                            } */}
                            
                        </button>
                    </div>
                </div>
            </form>
        </div>
        {/* render child pages */}
        {/* <Outlet /> */}
        </>
    );
};

export default Login;

