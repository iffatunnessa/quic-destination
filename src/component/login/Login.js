import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import LoginWithOther from '../loginWithOthers/LoginWithOther';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '60ch',
        },
    },
}));
const Login = () => {
    const classes = useStyles();
    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        email: '',
        password: '',
        photoURL: ''
    })
    const handleSubmit = (e) => {
        if (user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });

        }
        e.preventDefault();
    }
    const handleBlur = (e) => {
        let isFieldValid = true;

        console.log(e.target.name);
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            isFieldValid = e.target.value.length > 6;
            console.log(isFieldValid)
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
   
    return (
        <Container maxWidth="sm">
            <h2>Create an account</h2>
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField
                    onBlur={handleBlur}
                    id="standard-name-input"
                    label="Name"
                    type="name"
                    name="displayName"
                />
                <TextField
                    onBlur={handleBlur}
                    id="standard-email-input"
                    label="Username or Email"
                    type="email"
                    name="email"
                />
                <TextField
                    onBlur={handleBlur}
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                />
                <TextField
                    onBlur={handleBlur}
                    id="standard-confirm-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    name="confirmPassword"
                />
                <Button type='submit' variant="contained" color="secondary" >
                    Create an account
                </Button>
            </form>
            <LoginWithOther user={user}/>
        </Container>

    );
};

export default Login;