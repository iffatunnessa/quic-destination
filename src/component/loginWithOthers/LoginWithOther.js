import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { Button } from '@material-ui/core';
import { UserContext } from '../../App';
import { useHistory, useLocation } from "react-router-dom";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const LoginWithOther = (props) => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                console.log(result.user);
                const { displayName, email} = result.user;
                const signedInUser = { displayName, email };
                var accessToken = credential.accessToken;
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, credential, email);
            });
    }
    const handleFacebookSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                const { displayName, email } = result.user;
                const signedInUser = { displayName, email };
                var accessToken = credential.accessToken;
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, credential, email);
            });
    }
    
    return (
        <div>
            <Button type='submit' variant="contained" color="primary" onClick={handleGoogleSignIn}>
                Sign in with Google
            </Button>
            <Button type='submit' variant="contained" color="default" onClick={handleFacebookSignIn}>
                Sign in with facebook
                </Button>
            {/* <img src={user.photoURL} alt=""/>s */}
        </div>
    );
};

export default LoginWithOther;