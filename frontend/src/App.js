import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import TopHeader from "./components/layout/TopHeader/TopHeader";
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ScrollToTop from './components/utils/ScrollToTop';
import './scss/main.scss';
import ProductDetails from "./components/Product/ProductDetails";
import Products from './components/Products/Products.js';
import LoginSignUp from "./components/user/LoginSignUp";
import store from '../src/redux/store';
import { loadUser } from "./redux/actions/userAction";
import Profile from './components/user/Profile/Profile.js';
import UpdateProfile from './components/user/UpdateProfile/UpdateProfile.js';
import UpdatePassword from './components/user/UpdatePassword/UpdatePassword.js';
import ForgotPassword from './components/user/ForgotPassword/ForgotPassword.js';
import ResetPassword from './components/user/ResetPassword/ResetPassword.js';
import Cart from './components/Cart/Cart.js'
import Shipping from './components/Cart/Shipping/Shipping.js'
import ConfirmOrder from "./components/Cart/ConfirmOrder/ConfirmOrder";
import Payment from './components/Cart/Payment/Payment.js';
import OrderSuccess from "./components/Cart/OrderSuccess/OrderSuccess";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import ProtectedRoute from "./components/Route/ProtectedRoute";
import MyOrders from './components/Order/MyOrders.js';
import OrderDetails from './components/Order/OrderDetails/OrderDetails.js';
import Dashboard from './components/Admin/Dashboard.js';
import ProductList from './components/Admin/ProductList/ProductList.js'
import NewProduct from "./components/Admin/NewProduct/NewProduct";
import UpdateProduct from './components/Admin/UpdateProduct/UpdateProduct';
import OrderList from "./components/Admin/OrderList/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder/ProcessOrder"
import UserList from "./components/Admin/UserList/UserList";
import UpdateUser from "./components/Admin/UpdateUser/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews/ProductReviews";
function App() {

  //given when we reload we dont lose logined user data
  //render once after initial render

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {

    const { data } = await axios.get(`/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (



    <Router>
      <ScrollToTop />
      <TopHeader />
      <Header />


      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />

      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/login" component={LoginSignUp} />
      <Route exact path="/cart" component={Cart} />

      <ProtectedRoute exact path="/shipping" component={Shipping} />


      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <ProtectedRoute exact path='/success' component={OrderSuccess} />

      <ProtectedRoute exact path='/orders' component={MyOrders} />

      <Switch>
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      </Switch>

      <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
      <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />
      <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UserList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
      <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews} />
      <Footer />
    </Router>


  );
}

export default App;
