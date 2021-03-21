import React, { useContext } from 'react';
import { Button, Container, FormControl, FormHelperText, Input, InputLabel, makeStyles, TextField } from '@material-ui/core';
import { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import LoginWithOther from '../loginWithOthers/LoginWithOther';
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from '../../App';
import LoginForm from '../LoginForm/LoginForm';

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
const Login = () => {
    const classes = useStyles();
    const [newUser, setNewUser] = useState(true);
    const [createdNew, setNewCreated] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let errorCode, errorMessage;
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [currentPassword, setPasswordcheck] = useState('');
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
                    setNewCreated(createdNew);
                    console.log(createdNew);
                    updateUserInfo(res.displayName);
                })
                .catch((error) => {
                    errorCode = error.code;
                    errorMessage = error.message;
                    // <p>{errorCode}{errorMessage}</p>
                });

        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.isSignedIn = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
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
        let isFieldValid = false;
        console.log(isFieldValid);
        if (e.target.name === 'displayName') {
            if (e.target.value === '') {
                isFieldValid = false;
            }
            else { isFieldValid = true; }
            console.log("display",isFieldValid);
        }
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            isFieldValid = e.target.value.length > 6;
            setPasswordcheck(e.target.value);
            console.log(currentPassword);

        }
        if (e.target.name === 'confirmPassword') {
            if (e.target.value === currentPassword) {
                isFieldValid = true;
                console.log("check", currentPassword);
            }
            else if (e.target.value === '') {
                isFieldValid = false;
                console.log("wrong:", currentPassword);
            }
            else {
                isFieldValid = false;
            }
            console.log("con:", isFieldValid);
        }
        if (isFieldValid === true) {
            console.log("last",isFieldValid);
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
            <div id='alert'></div>
            { newUser && !createdNew && <div>
                <h2>Create an account</h2>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <TextField
                        onBlur={handleBlur}
                        id="standard-name-input"
                        label="Name"
                        type="text"
                        name="displayName"
                        required
                        helperText="Put your Full name here"
                    />
                    <TextField
                        onBlur={handleBlur}
                        id="standard-email-input"
                        label="Username or Email"
                        type="text"
                        name='email'
                        required
                    />
                    <TextField
                        onBlur={handleBlur}
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        name="password"
                        required
                    />
                    <TextField
                        onBlur={handleBlur}
                        id="standard-confirm-password-input"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        name="confirmPassword"
                        required
                    />
                    <Button type='submit' variant="contained" className={classes.btn} >
                        Create an account
                    </Button>
                </form>
                {/* <p>{errorCode}{errorMessage}</p> */}
                <p style={{ textAlign: 'center' }}>Already have an account? <Button onClick={() => setNewUser(!newUser)} style={{
                    color: '#FF6E40',
                    textTransform: 'capitalize',
                }}>Login</Button></p>
            </div>}

            { !newUser &&
                <LoginForm handleSubmit={handleSubmit} handleBlur={handleBlur} />
            }
            <LoginWithOther user={user} />
        </Container>
    );
};

export default Login;