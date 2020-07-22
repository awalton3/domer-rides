import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { airports, ND } from '../../common/constants';
import '../../App.css';

//Material UI - Forms 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';
import { UserContext } from '../../common/UserContext';

// const styles = theme => ({
//     notchedOutline: {
//         borderWidth: '1px',
//         borderColor: '#fff !important'
//     }
// });

function Home(props) {

    const user = useContext(UserContext)
    // const classes = props
    // console.log(classes)

    //Initialize state 
    const [origin, setOrigin] = useState('');
    const [dest, setDest] = useState('');
    const [time, setTime] = useState('2017-05-24T10:30');

    // Initialize component routing 
    let history = useHistory();

    // Component methods
    function handleChangeOrigin(event) {
        setOrigin(event.target.value);
    }

    function handleChangeDest(event) {
        setDest(event.target.value);
    }

    function handleChangeTime(event) {
        setTime(event.target.value);
    }

    function viewGroups() {
        //Navigate to groups page 
        history.push(`/groups/${origin}/${dest}/${Date.parse(time)}`);
    }

    return (
        <Container fluid className="primary-bg">
            <Row className="justify-content-center height-fullish">
                <Col className="align-self-center all-center-width">
                    <h1 className="center-text text-white">Find a Ride</h1>
                    <br /><br />
                    <FormControl variant="outlined" className="width-half">
                        <InputLabel id="demo-simple-select-outlined-label">Origin</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={origin}
                            onChange={handleChangeOrigin}
                            label="origin">
                            {[...airports, ND].map(place => <MenuItem key={place} value={place}>{place}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className="width-half" disabled={origin ? false : true}>
                        <InputLabel id="demo-simple-select-outlined-label">Destination</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={dest}
                            onChange={handleChangeDest}
                            label="dest">
                            {
                                origin === ND ?
                                    airports.map(airport => <MenuItem key={airport} value={airport}>{airport}</MenuItem>)
                                    : <MenuItem key={ND} value={ND}>{ND}</MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <br /><br />
                    <TextField
                        id="datetime-local"
                        label="Departure time"
                        type="datetime-local"
                        defaultValue={time}
                        onChange={handleChangeTime}
                        className="width-full"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        // InputProps={{
                        //     classes: {
                        //         notchedOutline:{  },
                        //     }
                        // }}
                    />
                    <br /><br />
                    <Button onClick={viewGroups} variant="contained" color="primary" className="width-full" disabled={ !origin || !dest || !time }>
                        Search
                    </Button>
                </Col>
            </Row>
        </Container>

    );
}

export default Home; 