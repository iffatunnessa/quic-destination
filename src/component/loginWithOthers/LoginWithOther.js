import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { UserContext } from '../../App';
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const useStyles = makeStyles((theme) => ({
    btn: {
        borderStyle: 'solid',
        borderRadius: 50,
        width: "80%",
        background: 'white',
        borderColor: "grey",
        paddingTop: 6,
        paddingBottom: 10,
        marginTop: 10
    },
    text: {
        textAlign: 'center',
        textTransform: 'capitalize',
        paddingLeft: 30,
    }
}));
const LoginWithOther = (props) => {
    const classes = useStyles();
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
                const { displayName, email } = result.user;
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
        <Grid container  spacing={0}>
            <Grid item xs={6} sm={12}>
                <div style={{ textAlign: 'center' }}>
                    <hr className='solid' />
                    <button onClick={handleGoogleSignIn} className={classes.btn}>
                        <FontAwesomeIcon icon={faGoogle} style={{ fontSize: 20, color: "red" }} />
                        <span className={classes.text}>Sign in with Google</span>
                    </button>
                    <button onClick={handleFacebookSignIn} className={classes.btn}>
                        <FontAwesomeIcon icon={faFacebook} style={{ fontSize: 20, color: "blue" }} />
                        <span className={classes.text}>Sign in with Facebook</span>
                    </button>

                </div>
            </Grid>
        </Grid>
    );
};

export default LoginWithOther;