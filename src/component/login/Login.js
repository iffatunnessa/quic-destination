import React, { useContext } from 'react';
import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import LoginWithOther from '../loginWithOthers/LoginWithOther';
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from '../../App';

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
    container:{
        marginTop:20,
        paddingTop:20,
        paddingBottom: 60,
        backgroundColor: 'white',
        borderRadius:5
    }
}));
const Login = () => {
    const classes = useStyles();
    const [newUser, setNewUser] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    
    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        email: '',
        password: '',
        photoURL: ''
    })
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    setUser(newUserInfo);
                    console.log(res.displayName);
                    updateUserInfo(res.displayName);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode,errorMessage);
                });

        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.isSignedIn = true
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log(res.displayName, "succesfully logged in");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    <p>{errorCode}{errorMessage}</p>
                });
        }
        e.preventDefault();
    }
    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            <h6>Invalid email</h6>
        }
        if (e.target.name === 'password') {
            isFieldValid = e.target.value.length > 6;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const updateUserInfo = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log("Update successful");
        }).catch(function (error) {
            console.log("An error happened");
        });
    }
    return (
        <Container maxWidth="sm" className={classes.container}>
            { newUser && <div>
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
                        name='email'
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
                <h6>Already have an account? <Button onClick={() => setNewUser(!newUser)} color='secondary'>Log In</Button></h6>
            </div>}

            { !newUser && <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
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
                <Button type='submit' variant="contained" color="secondary" >Log In</Button>
            </form>}
            <LoginWithOther user={user} />


        </Container>
    );
};

export default Login;