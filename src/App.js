import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {BrowserRouter as Router,Switch,Route,Link} 
from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext= createContext();

function App() {

  const [loginUser, setLoginUser]= useState({});

  return (
    <div className="App">
     <UserContext.Provider value={[loginUser,setLoginUser]}>

     
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
           <Review></Review>
          </Route>
          <Route path="/login">
            <Login/>

          </Route>
          <PrivateRoute path="/shipment">
            <Shipment/>

          </PrivateRoute>
          <PrivateRoute path="/Manage">
            <Manage/>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
             <ProductDetail></ProductDetail>
          </Route>
          <Route  path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>

     </UserContext.Provider>
    </div>
  );
}

export default App;
