import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, FormHelperText, Button, Dialog, DialogTitle } from '@material-ui/core';


import React, { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
function ModalForm(props) {
    const { open, setOpen } = props;

    const classes = useStyles();

    useEffect(() => {

    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    const form = (
        <div className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                <TextField id="standard-basic" label="Product code" required />
                <br />
                <TextField id="standard-basic" label="Product name" required />
                <br />
                <TextField id="standard-basic" label="Weight" required />
                <br />
                <TextField id="standard-basic" label="Type" required />
                <br />
                <TextField id="standard-basic" label="Unit" required />
                <br />
                <Button variant="contained" color="primary" component="span" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            {form}
        </Dialog>

    );

}


export default ModalForm;