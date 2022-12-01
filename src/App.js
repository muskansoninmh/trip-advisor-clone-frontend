import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import AppBar from "./components/Layout/AppBar";
import SignInOutContainer from "./components/SignInOutContainer";
import HomePage from "./components/HomePage";
import CategoryPage from "./components/CategoryPage";
import AdminPanel from "./components/AdminPanel/AdminPanel";

import Image from "./components/Image";
import Trip from "./components/Trip";
import Tour from "./components/Tour";
import CityTour from "./components/CityTour";
import Profile from "./components/Profile";
import UserList from "./components/AdminPanel/UserList";
import Routes from "./components/AdminPanel/Routes";
import error_Page from "./components/error_Page";
import { PrivateRoute } from "./components/PrivateRoute";
import Booking from "./components/Booking";
import NotFound404Page from "./components/notFound";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/category/:state/:id" component={CategoryPage} />
        <PrivateRoute
          action="Admin"
          exact
          path="/admin"
          component={AdminPanel}
        />
        <Route exact path="/image/:city/:id" component={Image} />

        <PrivateRoute action="User" path="/trip" component={Trip} />
        <PrivateRoute action="User" path="/booking" component={Booking} />

        <Route exact path="/tour/:id" component={Tour} />

        <Route exact path="/notFound" component={error_Page} />
        <Route path="/profile" component={Profile} />




        <Route exact path="/search/:name/:category" component={CityTour} />
      
      
        
            {Routes.map((route) => (
              <PrivateRoute
                action="Admin"
                exact
                path={route.path}
                key={route.path}
                component={route.component}
              />
            ))}
       
      
        <Route path="*" exact={true} component={error_Page} />
 

      </Switch>
    </Router>
  );
}
