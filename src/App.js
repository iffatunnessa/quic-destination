import { createContext, useContext, useState } from 'react';
import './App.css';
import Nav from './component/nav/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import NotFound from './component/NotFound/NotFound';
import Home from './component/home/Home';
import Login from './component/login/Login';
import RideClicked from './component/rideClicked/RideClicked';
import Destination from './component/Destination/Destination';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <h1>{loggedInUser.displayName}</h1>
        <Nav />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/">
            <Destination />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
