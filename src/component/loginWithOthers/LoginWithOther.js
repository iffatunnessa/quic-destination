import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { Button } from '@material-ui/core';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const LoginWithOther = (props) => {
    console.log(props);
    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        email: '',
        password: '',
        photoURL: ''
    })
    const provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log(user);
                setUser(user);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode,errorMessage,credential,email);
            });
    }
    const handleFacebookSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                setUser(user);
                console.log(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode,errorMessage,credential,email);
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