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
import VehiculeCreateScreen from "./screens/admin/VehiculeCreateScreen";
import ServiceScreen from "./screens/ServiceScreen";
import ServiceCreateScreen from "./screens/admin/ServiceCreateScreen";
import ServiceListScreen from "./screens/admin/ServiceListScreen";
import ServiceEdithScreen from "./screens/admin/ServiceEdithScreen";
import ContactFormScreen from "./screens/ContactFormScreen";
import MessageListScreen from "./screens/admin/MessagesLIstScreen";
import TermsAndConditions from "./screens/legal-obligations/TermsAndContditions";
import LegalMention from "./screens/legal-obligations/LegalMention";

// import OrdersScreen from "./screens/OrdersScreen";
// import OrderDetailsScreen from "./screens/OrderDetailsScreen";
// import CartScreenDetails from "./screen

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<ServiceScreen />} />
      <Route  path='/vehicules/all' element={<CatalogueScreen />} />
      <Route path='/vehicules/:id' element={<VehiculeScreenDetails />} />
      <Route path='/panier' element={<CartScreen />} />
      <Route path='/connexion' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/contact' element={<ContactFormScreen />} />
      <Route path='/cgu' element={<TermsAndConditions />} />
      <Route path='/mentionslegales' element={<LegalMention />} />




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
         <Route
          path='/admin/vehicule/create'
          element={<VehiculeCreateScreen />}
        />
        <Route
          path='/admin/service/create'
          element={<ServiceCreateScreen />}
        />
        <Route path='/admin/servicelist' 
        element={<ServiceListScreen />} />
      </Route>
      <Route
          path='/admin/service/:id/edit'
          element={<ServiceEdithScreen />}
        />
         <Route
          path='/admin/messageliste'
          element={<MessageListScreen />}
        />
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
