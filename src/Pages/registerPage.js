import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../Redux/Actions/userAction";
import { Loader } from "../Components/loader";
import { Success } from "../Components/Success";
import { Error } from "../Components/error";

const Register = () => {
  const registerState = useSelector((state) => state.registerUserReducer);
  const { error, success, loading } = registerState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const handleRegister = () => {
    if (password !== confirmPassword) {
        alert("Passwords do not match");
    } 
    else {
        const user = { name, email, password, confirmPassword };
        dispatch(registerUser(user));
    }
  };

  return (
    <div className="container mx-auto">
        {loading && <Loader />}
        {success && <Success success="User Register Successfully" />}
        {error && <Error error="Something went wrong" />}
        <form className="mt-8 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Registration</h1>
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
            </label>
            <input
                id="name"
                name="name"
                type="text"
                placeholder="enter name"
                autoComplete="name"
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
            </label>
            <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
            </label>
            <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </div>
            <button
            type="button"
            onClick={handleRegister}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Register
            </button>
        </form>
    </div>
  );
};

export default Register;
