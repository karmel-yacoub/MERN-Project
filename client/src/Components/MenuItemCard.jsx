import React, { useEffect, useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from '@reach/router'
import axios from 'axios';
import Navbar from './Navbar';
import { AuthContext } from '../Context/AuthContext';


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const MenuItemCard = ({ data }) => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const classes = useStyles();

    return (
        <Grid item key={idx} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={restaurant.picture}
                    title={restaurant.name}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {restaurant.name}
                    </Typography>
                    <Typography>
                        {restaurant.location}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium" color="primary">
                        <Link to={'restaurants/' + restaurant._id}>View</Link>
                    </Button>
                </CardActions>
            </Card>
        </Grid>

    )
}

export default MenuItemCard
