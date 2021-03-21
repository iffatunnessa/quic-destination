import React, { useContext, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import './nav.css';
import { Link } from "react-router-dom";
import { UserContext } from '../../App';
import Login from '../login/Login';

const Nav = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const displayName = loggedInUser.displayName;
    return (
        <Container maxWidth='md'>
            <nav >
                <Link to="/home" className="link"><span className='header'>Quick Destination</span></Link>
                <Link to="/home" className="link">Home</Link>
                <Link to="/destination" className="link">Destination</Link>
                <Link to="/blog" className="link">Blog</Link>
                <Link to="/contact" className="link">Contact</Link>
                {
                    loggedInUser.email ?
                        <Link to="/" className="disabled-link" >{displayName}</Link>
                        : <Button component ={Link} to="/login" variant="contained" color="secondary" >Login</Button>
                }
            </nav>
        </Container >
    );
};

export default Nav;