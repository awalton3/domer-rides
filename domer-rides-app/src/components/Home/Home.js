import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { airports, ND } from '../../common/constants';
import Groups from '../Groups/Groups';
import GroupContextProvider from '../Groups/GroupContext';

//Material UI - Forms 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Home() {

    //Initialize state 
    const [origin, setOrigin] = useState('');
    const [dest, setDest] = useState('');
    const time = 1594181989744; 

    //Get history 
    let history = useHistory();

    function handleChangeOrigin(event) {
        setOrigin(event.target.value);
    }
    function handleChangeDest(event) {
        setDest(event.target.value);
    }

    function viewGroups() {
        //Navigate to groups page 
        history.push(`/groups/${origin}/${dest}/${time}`); 
    }

    return (
        <div>
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Origin</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={origin}
                    onChange={handleChangeOrigin}
                    label="origin">
                    <MenuItem value={ND}>Notre Dame</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Destination</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dest}
                    onChange={handleChangeDest}
                    label="dest">
                    {airports.map(airport => <MenuItem key={airport} value={airport}>{airport}</MenuItem>)}
                </Select>
            </FormControl>
            <br/>
            <TextField
                id="datetime-local"
                label="Departure Time"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button onClick={viewGroups} variant="contained" color="primary" className="width-full">
                Find a Ride 
            </Button>
        </div>

        // <GroupContextProvider>
        //     <Groups></Groups>
        // </GroupContextProvider>
    );
}

export default Home; 