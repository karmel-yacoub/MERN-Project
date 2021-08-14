import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");

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
            })
            .catch(err => console.log(err));
    };


    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
        </div>
    );
}
