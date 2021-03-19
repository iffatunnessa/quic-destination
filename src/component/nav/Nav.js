import React from 'react';
import Home from '../home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from '../login/Login';
import { Button } from '@material-ui/core';
import './nav.css'
const Nav = () => {
    return (
        <Router>
            <div>
                <nav >
                    <Link to="/home" className="link"><span className='header'>Quick Destination</span></Link>
                    <Link to="/home" className="link">Home</Link>
                    <Link to="/destination" className="link">Destination</Link>
                    <Link to="/blog" className="link">Blog</Link>
                    <Link to="/contact" className="link">Contact</Link>
                    <Button component={Link} variant="contained" color="secondary" to="/login" className="button">Login</Button>
                </nav>

                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default Nav;