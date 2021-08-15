
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
import { Link, navigate } from '@reach/router'
import axios from 'axios';
import Navbar from './Navbar';
import { AuthContext } from '../Context/AuthContext';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




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
    const [selectedItems, setSelectedItems] = useState([{}]);
    const [total, setTotal] = useState(0);


    const updateMenuItems = (modifiedItems) => {
        setMenuItems(modifiedItems);
    }

    const modifyOrder = (e, idx, name, price) => {
        const order = [...selectedItems.slice(0, idx), { ...selectedItems[idx], "quantity": e.target.value, "name": name, "price": price }, ...selectedItems.slice(idx + 1)];
        // console.log(idx)
        // const order = selectedItems.map((item, index) => {

        //     if (index === idx) {
        //         item.quantity = e.target.value;
        //     }
        //     return item
        // });
        let sum = 0;
        order.map(item => {
            sum += item.quantity * item.price;
        })
        setTotal(sum)
        setSelectedItems(order)
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTotal(0);
        setSelectedItems([{}])
    };

    const confirmOrder = () => {
        axios.post("http://localhost:8000/api/order", { customer: user._id, restaurant: props.id, price: total })
            .then(res => {
                console.log(res);
                handleClose();
                navigate("/")
            })
            .catch(err => console.log(err))

    }

    return (
        <div>
            {user._id === props.id ? <MenuItemForm updateMenuItems={updateMenuItems} menuItems={menuItems} /> : null}
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
                                            {
                                                user.genre === "customer" ?
                                                    <Typography>
                                                        <TextField
                                                            value={selectedItems !== [{}] ? selectedItems.length > idx ? selectedItems[idx].quantity : 0 : 0}
                                                            onChange={(e) => modifyOrder(e, idx, menuItem.name, menuItem.price)}
                                                            autoComplete="quantity"
                                                            name="quantitys"
                                                            variant="outlined"
                                                            type="number"
                                                            required
                                                            // fullWidth
                                                            id="quantity"
                                                            label="Quantity"
                                                            autoFocus
                                                        />
                                                    </Typography>
                                                    :
                                                    null
                                            }
                                        </CardContent>

                                    </Card>
                                </Grid>
                            ))}

                            {
                                user.genre === "customer" ?
                                    <div style={{ margin: "0 auto" }}>
                                        {menuItems.length > 0 ?
                                            <Button size="large" color="primary" className={classes.margin} variant="contained" color="primary" onClick={handleClickOpen}>
                                                Order!
                                            </Button> :
                                            null
                                        }

                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Confirm Order"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    {
                                                        selectedItems.map(item => {
                                                            // setTotal(total + item.quantity * item.price)
                                                            return (
                                                                <>
                                                                    <p>{item.name} || Quantity:{item.quantity} || Price:{item.price} || {item.quantity * item.price} </p>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    <p>Total: {total} £P</p>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} color="primary">
                                                    Cancel
                                                </Button>
                                                <Button onClick={confirmOrder} color="primary" autoFocus>
                                                    Confirm
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div> :
                                    null
                            }
                        </Grid>
                    </Container>
                </main>

            </React.Fragment>
        </div >
    )
}

export default Menu
