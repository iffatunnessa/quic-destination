import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RideRoute from '../RideRoute/RideRoute';
import RideData from '../fakedata/rideData.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
    textField: {
        backgroundColor: 'white',
        marginBottom:10,
        borderRadius : 5
    },
    btn:{
        width:'85%',
        borderRadius : 0
    }
}));
const RideClicked = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [rideData, setrideData] = useState(RideData);
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
                    <TextField className={classes.textField}
                        id="from"
                        label="Pick From"
                        type="name"
                        name="from"
                        variant="filled"
                        onBlur={handleBlur}
                    />
                    <TextField className={classes.textField}
                        id="to"
                        label="Pick To"
                        type="toGo"
                        name="to"
                        variant="filled"
                        onBlur={handleBlur}
                    />
                    <Button color="secondary" className={classes.btn} onClick={() => setState(!state)} variant="contained">Submit</Button>
                </form>
            }
            {
                state && <div>
                    <div style={{ backgroundColor: 'orangered', paddingTop: "5px", paddingBottom: "5px", paddingLeft: "20px", borderRadius: 5, color: "white" }}>
                        <h3> <FontAwesomeIcon icon={faCircle} style={{ fontSize: 10 }} /> {destination.from}</h3>
                        <p style={{ marginTop: "-20px", marginBottom: "-20px", padding: 2 }}><FontAwesomeIcon icon={faEllipsisV} /></p>
                        <h3> <FontAwesomeIcon icon={faCircle} style={{ fontSize: 10 }} /> {destination.to}</h3>
                    </div>
                    <div>
                        {rideData.map(data => { if (data.id === id) { return <RideRoute data={data} ></RideRoute> } })}
                    </div>
                </div>
            }
        </div>

    );
};

export default RideClicked;