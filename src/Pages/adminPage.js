import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import { Switch, Route, useNavigate } from "react-router-dom";

import Pizzalist from "../Components/Admin/pizzaList";
import Userlist from "../Components/Admin/userList";
import OrderList from "../Components/Admin/orderList";
import AddNewPizza from "../Components/Admin/addNewPizza";
import EditPizza from "../Components/Admin/editPizza";

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userState = useSelector((state) => state.loginUserReducer);
    // console.log("Admin_userState: ", userState);
    const { currentUserData } = userState.currentUser;

    useEffect(() => {
        if (!localStorage.getItem("currentUser") || currentUserData.type !== 'Admin') {
            // window.location.href='/';
            navigate("/");
        }
    }, [currentUserData, navigate]);

    return (
        <>
        <div className="container mx-auto">
            <div className="text-center bg-gray-700 text-slate-50 text-2xl p-2">
                Admin Panel
            </div>

            <div className="flex">
                <div className="w-1/6 bg-gray-200 min-h-screen flex flex-col justify-center">
                    <button
                        className={`w-full p-3 text-left ${location.pathname === "/admin/addnewpizza" ? 'bg-gray-500' : 'bg-gray-400'} hover:bg-gray-500`}
                        onClick={() => navigate("/admin/userlist")}
                    >
                        All Users
                    </button>

                    <Link
                        to="/admin/pizzalist"
                        className={`w-full p-3 text-left ${location.pathname === "/admin/pizzalist" ? 'bg-gray-500' : 'bg-gray-400'} hover:bg-gray-500`}
                    >
                        All Pizzas
                    </Link>
                    {/* <button
                        className={`w-full p-3 text-left ${location.pathname === "/admin/pizzalist" ? 'bg-gray-500' : 'bg-gray-400'} hover:bg-gray-500`}
                        onClick={() => navigate("/admin/pizzalist")}
                    >
                        All Pizzas
                    </button> */}
                    
                    <button
                        className={`w-full p-3 text-left ${location.pathname === "/admin/addnewpizza" ? 'bg-gray-500' : 'bg-gray-400'} hover:bg-gray-500`}
                        onClick={() => navigate("/admin/addnewpizza")}
                    >
                        Add New Pizza
                    </button>
                    <button
                        className={`w-full p-3 text-left ${location.pathname === "/admin/orderlist" ? 'bg-gray-500' : 'bg-gray-400'} hover:bg-gray-500`}
                        onClick={() => navigate("/admin/orderlist")}
                    >
                        All Orders
                    </button>
                </div>

                <div className="w-5/6 bg-white p-4">
                    {location.pathname.startsWith('/admin/pizzalist') && <Pizzalist />}
                    {location.pathname.startsWith('/admin/addnewpizza') && <AddNewPizza />}
                    {location.pathname.startsWith('/admin/editpizza') && <EditPizza />}
                    {location.pathname.startsWith('/admin/orderlist') && <OrderList />}
                    {location.pathname.startsWith('/admin/userlist') && <Userlist />}
                </div>

                {/* <div className="w-3/4 bg-white p-4">
                    <Routes>
                        <Route path="/admin" component={Pizzalist} exact />
                        <Route path="/admin/pizzalist" component={Pizzalist} exact />
                    </Routes>
                </div> */}

                {/* <div className="w-3/4 bg-white p-4">
                    <Switch>
                    <Route path="/admin" component={Userlist} exact />
                    <Route
                        path="/admin/userlist"
                        component={Userlist}
                        exact
                    />
                    <Route
                        path="/admin/editpizza/:pizzaId"
                        component={EditPizza}
                        exact
                    />
                    <Route
                        path="/admin/pizzalist"
                        component={Pizzaslist}
                        exact
                    />
                    <Route
                        path="/admin/addnewpizza"
                        component={AddNewPizza}
                        exact
                    />
                    <Route
                        path="/admin/orderlist"
                        component={OrderList}
                        exact
                    />
                    </Switch>
                </div> */}
            </div>
        </div>
        </>
    );
};

export default Admin;
