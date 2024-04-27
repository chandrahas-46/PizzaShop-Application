import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../Redux/Actions/userAction';

const Navbar = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cartReducer);
    const userState = useSelector((state) => state.loginUserReducer);  //{token available : userState.currentUser.token}
    let currentUserData;
    if(userState.currentUser){
        currentUserData = userState.currentUser.currentUserData; 
    }
    // console.log("NAVBAR_CurrentUSER: ", currentUserData); //[email, name, type, _id]

    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <>
            {/* main container */}
            {/* <div className="bg-gradient-to-r from-cyan-500 from-10% via-emerald-500 via-30% to-blue-500 to-90%"> */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row justify-between items-center px-[5%] h-[50px] text-lg font-medium sticky top-0 z-10 text-white">
                {/* app heading */}
                <div className="hover:text-black mx-[10px]">
                    <NavLink to="/" className="text-gray-800">
                        My App
                    </NavLink>
                </div>

                {/* all the navigation link */}
                <div className="flex flex-row">
                    <NavLink to="/" activeClassName="text-red" className="flex flex-row hover:text-black mx-[10px] items-center">
                        <span>Home</span>
                    </NavLink>

                    {/* ############ SWITCH b/w CURRENT USER ############# */}
                    {
                        currentUserData ? (
                            <div className="relative">
                                <button onClick={() => setDropdownOpen(!dropdownOpen)} activeClassName="text-red" className="hover:text-black mx-[10px] py-2">
                                    {currentUserData.name}
                                </button>
                                {dropdownOpen && (
                                    <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1">
                                        {(currentUserData.type === "Admin" || currentUserData.type === "admin") && (
                                            <li>
                                                <NavLink to="/admin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Admin Panel
                                                </NavLink>
                                            </li>
                                        )}

                                        <li>
                                            <NavLink to="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Orders
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    dispatch(logoutUser());
                                                }}
                                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            // <NavLink to="/" className="hover:text-black mx-[10px]">
                            //     <span>{currentUserData.name}</span>
                            // </NavLink>
                        ) : (
                            <>
                            <NavLink to="/login" activeClassName="text-red" className="flex flex-row hover:text-black mx-[10px] items-center">
                                <FaUser /> &nbsp;
                                <span>Login</span>
                            </NavLink>

                            {/* <NavLink to="/register" activeClassName="text-red" className="flex flex-row hover:text-black mx-[10px] items-center">
                                <FaUser /> &nbsp;
                                <span>Register</span>
                            </NavLink> */}
                            </>
                        )
                    }

                    <NavLink to="/cart" activeClassName="text-red-500" className="flex flex-row hover:text-black mx-[10px] items-center">
                        <BsCartFill /> &nbsp;
                        <span>Cart <sup>{cartState.cartItems.length}</sup></span>
                    </NavLink>
                </div>
            </div>
            {/* render child pages */}
            <Outlet />
        </>
    );
}

export default Navbar;
