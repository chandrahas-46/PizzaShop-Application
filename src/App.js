import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Pages/home";
import Cart from "./Pages/cartPage";
import Login from "./Pages/loginPage";
// import Register from "./Pages/registerPage";
import Order from "./Pages/orderPage";

import Admin from "./Pages/adminPage";
import Userlist from "./Components/Admin/userList";
import Pizzalist from "./Components/Admin/pizzaList";
import OrderList from "./Components/Admin/orderList";
import AddNewPizza from "./Components/Admin/addNewPizza";
import EditPizza from "./Components/Admin/editPizza";

function App() {
    // all the link routes
    const router = createBrowserRouter([
        {
            path:"/", 
            element: <Navbar />,
            // errorElement: <Error />,
            children:[
                { index:true, element: <Home />},
                { path:"cart", element: <Cart />},
                { path:"register", element: <Login />},
                { path:"login", element: <Login />},
                { path:"orders", element: <Order />},
                // { path:"admin", element: <Admin />},
                { 
                    path:"admin", 
                    element: <Admin />,
                    children: [
                        { index:true, element: <Admin />},
                        { path:"userlist", element: <Userlist />},
                        { path:"pizzalist", element: <Pizzalist /> },
                        { path:"OrderList", element: <OrderList />},
                        { path:"addnewpizza", element: <AddNewPizza />},
                        { path:"editpizza/:pizzaId", element: <EditPizza />},
                    ]
                },

                // { 
                //     path:"/products", 
                //     children: [
                //         { index:true, element: <Home />},
                //         { path:"categories", element: <Categories />},
                //         { path:"category/:category_name", element: <Home />},
                //         { path:":id", element: <ProductDetails />},
                //     ]
                // }
            ]
        }
    ]);

    return (
        <>
            {/* <Navbar /> */}
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
