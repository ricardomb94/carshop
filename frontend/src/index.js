import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createBrowserRoutesFromElemnts,
  createRoutesFromElements,
  Route,
  RouteProvider,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./store";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import CatalogueScreen from "./screens/CatalogueScreen";
import VehiculeScreenDetails from "./screens/VehiculeScreenDetails";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import VehiculeListScreen from "./screens/admin/VehiculeListScreen";
import VehiculeEditScreen from "./screens/admin/VehiculeEditScreen";

// import OrdersScreen from "./screens/OrdersScreen";
// import OrderDetailsScreen from "./screens/OrderDetailsScreen";
// import CartScreenDetails from "./screen

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<CatalogueScreen />} />
      <Route path='/vehicules/:id' element={<VehiculeScreenDetails />} />
      <Route path='/panier' element={<CartScreen />} />
      <Route path='/connexion' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/envoie' element={<ShippingScreen />} />
        <Route path='/payement' element={<PaymentScreen />} />
        <Route path='/commande' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderList' element={<OrderListScreen />} />
        <Route path='/admin/vehiculeslist' element={<VehiculeListScreen />} />
        <Route
          path='/admin/vehicule/:id/edit'
          element={<VehiculeEditScreen />}
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
