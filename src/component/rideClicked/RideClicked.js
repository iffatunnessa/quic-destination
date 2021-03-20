import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import RideRoute from '../RideRoute/RideRoute';
import rideData from '../fakedata/rideData.json';
const useStyles = makeStyles((theme) => ({
    text: {

    }
}));
const RideClicked = () => {
    const classes = useStyles();
    const [fakeData, setFakeData] = useState(rideData);
    const [state, setState] = useState(false);
    const [destination, setDestination] = useState({
        from: '',
        to: ''
    })

    const handleBlur = (e) => {
        const newInfo = { ...destination };
        newInfo[e.target.name] = e.target.value;
        setDestination(newInfo);
    }
    return (
        <div>
            {!state &&
                <form>
                    <TextField className={classes.text}
                        id="from"
                        label="Pick From"
                        type="name"
                        name="from"
                        variant="outlined"
                        onBlur={handleBlur}
                    />
                    <TextField className={classes.text}
                        id="to"
                        label="Pick To"
                        type="toGo"
                        name="to"
                        variant="outlined"
                        onBlur={handleBlur}
                    />
                    <Button color="secondary" onClick={() => setState(!state)} className={classes.btn} variant="contained">Submit</Button>
                </form>
            }
            {
                state && <div>
                    <div style={{backgroundColor:'orangered',padding:5,borderRadius:5, color:"white"}}>
                        <h5>{destination.from}</h5>
                        <h5>{destination.to}</h5></div>
                      <div>  {fakeData.map(data=> <RideRoute data={data}></RideRoute>)}
                    </div>
                </div>
            }
        </div>

    );
};

export default RideClicked;