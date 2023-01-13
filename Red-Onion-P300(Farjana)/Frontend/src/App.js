import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Shop from './components/Shop/Shop';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import GoogleSignIn from './components/Authentication/GoogleSignIn/GoogleSignIn';
import { AuthContextProvider } from './components/Authentication/useAuth';
import OrderPlaced from './components/OrderPlaced/OrderPlaced';
import User from './components/User/User';


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Banner></Banner>
              <Shop></Shop>
              <About></About>
            </Route>
            <Route path="/shop">
              <Banner></Banner>
              <Shop></Shop>
              <About></About>
            </Route>
            <Route path="/product/:productKey">
              <ProductDetails></ProductDetails>
            </Route>
            <Route path="/cart">
             <Cart></Cart>
            </Route>
            <Route path='/orderPlaced'>
              <OrderPlaced></OrderPlaced>
            </Route>
            <Route path='/login'>
              <GoogleSignIn></GoogleSignIn>
            </Route>
            <Route path='/user'>
              <User/>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
