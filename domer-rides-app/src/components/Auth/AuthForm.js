import React from 'react'

// Material UI Forms 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AuthForm(props) {
    return (
        <div>
            <form noValidate autoComplete="off" className="width-full">
                <TextField id="email" label="email" variant="outlined" className="width-full" />
                <br />
                <br />
                <TextField id="password" label="password" variant="outlined" className="width-full" />
            </form>
            <br />
            <Button onClick={() => { props.onSubmit('awalton3@nd.edu', 'ana1234') }} variant="contained" color="primary" className="width-full">
                { props.view }
            </Button>
        </div>
    );
}

export default AuthForm; 