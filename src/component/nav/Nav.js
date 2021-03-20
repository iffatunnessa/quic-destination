import React, { useContext, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import './nav.css';
import { Link } from "react-router-dom";
import { UserContext } from '../../App';

const Nav = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const displayName = loggedInUser.displayName;
    const isSignedIn =()=>{
        if (displayName === '') { return false; }
        return true;
    } 


    return (
        <Container maxWidth='md'>
            <nav >
                <Link to="/home" className="link"><span className='header'>Quick Destination</span></Link>
                <Link to="/home" className="link">Home</Link>
                <Link to="/destination" className="link">Destination</Link>
                <Link to="/blog" className="link">Blog</Link>
                <Link to="/contact" className="link">Contact</Link>
                {
                    isSignedIn ? <Link to="/" className="disabled-link" >{displayName}</Link>
                        : <Button variant="contained" color="secondary" >Login</Button>
                }
            </nav>
        </Container >
    );
};

export default Nav;