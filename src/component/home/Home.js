import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { Grid} from '@material-ui/core';
import HomeCard from '../homeCard/HomeCard';
import homeData from '../fakedata/fakedata.json';
import './Home.css';

// const useStyles = makeStyles(() =>
//     createStyles({
        
//     }),
// );
const Home = () => {
    // const classes = useStyles();
    const [data, setData] = useState(homeData);

    return (
        <div className='home'>
            <Container maxWidth="md">
                <Grid container className='grid' spacing={0}>
                    {
                        data.map(element => <HomeCard element={element}></HomeCard>)
                    }

                </Grid>
            </Container >
        </div>
    );
};

export default Home;