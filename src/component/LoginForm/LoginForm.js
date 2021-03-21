import { Button, makeStyles, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Login from '../login/Login';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '60ch',
        },
    },
    container: {
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 60,
        backgroundColor: 'white',
        borderRadius: 5
    },
    btn: {
        background: "#FF6E40",
        textTransform: 'capitalize',
        color: 'white',
        width: "95%",
        borderRadius: 0
    }
}));
const LoginForm = (props) => {
    const { handleBlur, handleSubmit } = props;
    const classes = useStyles();
    return (
        <div>
            <h2>Login</h2>
            <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    onBlur={handleBlur}
                    id="login-email-input"
                    label="Username or Email"
                    type="email"
                    name="email"
                />
                <TextField
                    onBlur={handleBlur}
                    id="login-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                />
                <Button type='submit' variant="contained" className={classes.btn} >Log In</Button>
            </form>
            <p>Don't have an account? <Button onClick={()=><Login />} style={{
                color: '#FF6E40',
                textTransform: 'capitalize',
            }}>Create New Acount</Button>
            </p>
        </div>
    );
};

export default LoginForm;