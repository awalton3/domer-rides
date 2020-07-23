import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function AddGroupModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [time, setTime] = React.useState('07:30');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeTime = (event) => {
        setTime(event.target.value);
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title" className="center-text">Create a group</h2>
            <br/>
            <TextField
                id="time"
                label="Departure Time"
                type="time"
                defaultValue={time}
                className="width-full"
                onChange={handleChangeTime}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 1800, //30 min 
                }}
            />
            <br/><br/><br/>
            <Button onClick={() => {handleClose(); props.onAdd(time); }} variant="contained" color="primary" className="width-full">Create a Group</Button>
        </div>
    );

    return (
        <div>
            <div className="fab-btn">
                <Fab color="primary" aria-label="add" onClick={handleOpen}>
                    <i className="material-icons">add</i>
                </Fab>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition={true}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
    >
                {body}
            </Modal>
        </div>
    );
}