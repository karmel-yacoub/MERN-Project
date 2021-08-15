import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

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

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");
    const classes = useStyles();



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPicture("");
    };

    const newItem = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('picture', picture, picture.name);
        fd.append('name', name);
        fd.append('price', price);
        fd.append('description', description);
        axios.post('http://localhost:8000/api/menuitem', fd)
            .then(res => {
                console.log(res);
                setOpen(false);
                setName("");
                setPrice(0);
                setDescription("");
                setPicture("");
                const modifiedItems = [...props.menuItems, res.data]
                props.updateMenuItems(modifiedItems);
            })
            .catch(err => console.log(err));
    };


    return (
        <div>
            <Button size="large" color="primary" className={classes.margin} variant="contained" onClick={handleClickOpen}>
                Add a new item to menu
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        People are waiting for your new delicious recipe
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="picture"
                        label="Picture"
                        type="file"
                        fullWidth
                        onChange={e => setPicture(e.target.files[0])}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={newItem} color="primary" disabled={typeof (picture) === "object" ? false : true}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
