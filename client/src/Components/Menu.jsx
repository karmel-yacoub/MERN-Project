
import MenuItemForm from './MenuItemForm';
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
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Menu = (props) => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const classes = useStyles();
    const [menuItems, setMenuItems] = useState([])
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const updateMenuItems = (modifiedItems) => {
        setMenuItems(modifiedItems);
    }


    useEffect(() => {
        axios.get("http://localhost:8000/api/users/" + props.id)
            .then(res => {
                setLoaded(true)
                setMenuItems(res.data.menu)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <MenuItemForm updateMenuItems={updateMenuItems} menuItems={menuItems} />
            <React.Fragment>

                <main>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        {/* <h2>Restaurants</h2> */}
                        <Grid container spacing={4}>
                            {loaded && menuItems.map((menuItem, idx) => (
                                <Grid item key={idx} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            onClick={handleClickOpen}
                                            className={classes.cardMedia}
                                            image={menuItem.picture}
                                            title={menuItem.name}
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {menuItem.name}
                                            </Typography>
                                            <Typography>
                                                {menuItem.description}
                                            </Typography>
                                            <Typography>
                                                Price: {menuItem.price}
                                            </Typography>
                                        </CardContent>

                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>

            </React.Fragment>
        </div>
    )
}

export default Menu
