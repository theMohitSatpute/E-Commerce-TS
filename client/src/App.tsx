import React, { useEffect } from "react";
import "./App.css";
import Home from "./modules/layout/pages/home/Home";
import UserRegister from "./modules/users/pages/user-register/UserRegister";
import UserLogin from "./modules/users/pages/user-login/UserLogin";
import UserProfile from "./modules/users/pages/user-profile/UserProfile";
import ChangePassword from "./modules/users/pages/user-password/ChangePassword";
import ToastConfiguration from "./modules/ui/components/toast-config/ToastConfiguration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FashionCatalogue from "./modules/products/pages/catalogues/fashion/FashionCatalogue";
import ElectronicsCatalogue from "./modules/products/pages/catalogues/electronics/ElectronicsCatalogue";
import HouseholdCatlogue from "./modules/products/pages/catalogues/household/HouseholdCatalogue";
import CartPage from "./modules/carts/pages/cart-page/CartPage";
import MyOrders from "./modules/orders/pages/my-orders/MyOrders";
import UploadProduct from "./modules/products/pages/upload-products/UploadProducts";
import ManageProduct from "./modules/products/pages/manage-products/ManageProducts";
import ManageOrder from "./modules/orders/pages/manage-orders/ManageOrders";
import * as userActions from "./redux/users/user.action";
import AddShippingAddress from "./modules/users/pages/shipping-address/AddShippingAddress";
import EditShippingAddress from "./modules/users/pages/shipping-address/EditShippingAddress";
import AddCategory from "./modules/categories/pages/AddCategory";
import ViewProduct from "./modules/products/pages/view-products/ViewProduct";
import CheckoutPage from "./modules/carts/pages/checkout-page/CheckoutPage";
import { TokenUtil } from "./util/TokenUtil";
import { AppDispatch, useAppDispatch } from "./redux/store";
import OrderDetails from "./modules/orders/pages/order-details/OrderDetails";
import EditProduct from "./modules/products/pages/edit-products/EditProduct";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import SuperAdminRoute from "./router/SuperAdminRoute";

function App() {
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    if (TokenUtil.isLoggedIn()) dispatch(userActions.getUserInfoAction());
  }, []);

  useEffect(() => {
    dispatch(userActions.getMyAddressAction())
  }, [])

  return (
    <div className="App">
      <ToastConfiguration />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} ></Route>
          <Route path={"/users/login"} element={<UserLogin />} ></Route>
          <Route path={"/users/register"} element={<UserRegister />} />
          <Route path={"/users/profile"} element={<PrivateRoute><UserProfile /></PrivateRoute>} ></Route>
          <Route path={"/users/change-password"} element={<PrivateRoute><ChangePassword /></PrivateRoute>} ></Route>
          <Route
            path={"/users/add-shipping-address/"}
            element={<PrivateRoute><AddShippingAddress /></PrivateRoute>}
          ></Route>
          <Route
            path={"/users/edit-shipping-address/:addressId"}
            element={<PrivateRoute><EditShippingAddress /></PrivateRoute>}
          ></Route>
          <Route path={"/carts/list"} element={<PrivateRoute><CartPage /></PrivateRoute>} ></Route>
          <Route path={"/carts/checkout"} element={<PrivateRoute><CheckoutPage /></PrivateRoute>} ></Route>
          <Route path={"/products/upload"} element={<AdminRoute><UploadProduct /></AdminRoute>} ></Route>
          <Route path={"/products/admin"} element={<SuperAdminRoute><ManageProduct /></SuperAdminRoute>} ></Route>
          <Route path={"/users/orders/me"} element={<PrivateRoute><MyOrders /></PrivateRoute>} ></Route>
          <Route path={"/products/fashion"} element={<PrivateRoute><FashionCatalogue /></PrivateRoute>} ></Route>
          <Route
            path={"/products/electronics"}
            element={<PrivateRoute><ElectronicsCatalogue /></PrivateRoute>}
          ></Route>

          <Route path={"/products/household"} element={<PrivateRoute><HouseholdCatlogue /></PrivateRoute>} ></Route>
          <Route
            path={"/products/view/:category/:productId"}
            element={<PrivateRoute><ViewProduct /></PrivateRoute>}
          ></Route>
          <Route
            path={"/products/edit/:productId"}
            element={<SuperAdminRoute><EditProduct /></SuperAdminRoute>}
          ></Route>
          <Route path={"/categories/add"} element={<AdminRoute><AddCategory /></AdminRoute>} ></Route>
          <Route path={"/orders/admin"} element={<PrivateRoute><ManageOrder /></PrivateRoute>} ></Route>
          <Route path={"/orders/placed"} element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
