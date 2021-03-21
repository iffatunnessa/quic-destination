import { Button, Container, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import RideClicked from '../rideClicked/RideClicked';
import GoogleMap from './GoogleMap';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '60ch',
        },
    },
    grids: {
        padding: 20
    },
    grid: {
        padding: 30,
        borderRadius: 5,
        maxWidth: 300,
        backgroundColor: 'lightslategrey'
    },
    map: {
        maxWidth: 400,
        marginLeft: 20,
        width: '100%',
        height: '100%'
    }
}));


const Destination = () => {
    const classes = useStyles();
    return (
        <div>
            <Container maxwidth='md'>
                <Grid container spacing={0} className={classes.grids}>
                    <Grid item className={classes.grid} xs={12} sm={3}>
                        <RideClicked />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.map} >
                        <GoogleMap />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Destination;
