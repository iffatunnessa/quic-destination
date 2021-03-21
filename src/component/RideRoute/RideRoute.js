import { Grid} from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../fakedata/fakedata.json';
import riderData from '../fakedata/rideData.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

const RideRoute = (props) => {
  const { id } = useParams();
  const { title, img } = data.find(vehicle => vehicle.id === id);
  const { bill, person } = props.data;
  return (
    <Grid container style={{padding:5,marginTop:5, borderRadius:5, background:"white"}}>
      <Grid item >
        <img src={img} alt="" style={{ width: "50px", marginTop:"13px" }} />
      </Grid>
      <Grid item>
        <h4 style={{ marginLeft:"20px" }}>{title}</h4>
      </Grid>
      <Grid item >
        <h4 style={{ marginLeft:"10px" }}> <FontAwesomeIcon icon={faUserFriends} style={{color:"lightslategrey"}}/> {person}</h4>
      </Grid>
      <Grid item >
        <h4 style={{marginLeft:"20px"}}>{bill}</h4>
      </Grid>
    </Grid>

  );
};

export default RideRoute;