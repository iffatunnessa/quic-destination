import { Card, CardActionArea, CardContent, CardMedia, createStyles, Grid,  makeStyles } from '@material-ui/core';
import React from 'react';
import {Link} from "react-router-dom";
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 30,
            width: 200,
            height: 200,
            textAlign: "center",
        },
        img: {
            width: "50%",
            paddingTop: 20,
            marginLeft: 50,
        },
        area:{
            textDecoration: 'none',
            color:"black",

            
        }
    }),
);

const HomeCard = (props) => {
    const classes = useStyles();
    const { img, title } = props.element;
    console.log(props);
    return (
        <Grid item xs={12} sm={3}>
            <Card className={classes.root} variant="outlined">
                <CardActionArea className={classes.area} component={Link} to="/destination">
                    <CardMedia
                        component="img"
                        alt={title}
                        image={img}
                        title={title}
                        className={classes.img}
                    />
                    <CardContent>
                        <h2>{title}</h2>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

    );
};

export default HomeCard;