import React, {useState} from 'react'

// Material UI Forms 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AuthForm(props) {

    // Create models for inputs 
    const [ email, setEmail ] = useState('');
    const [ password, setPass] = useState('');

    //Manage input changes 
    function handleChangeEmail(event) {
        setEmail(event.target.value); 
    }
    function handleChangePass(event) {
        setPass(event.target.value); 
    }

    return (
        <div>
            <form noValidate autoComplete="off" className="width-full">
                <TextField id="email" label="email" variant="outlined" className="width-full" onChange={handleChangeEmail} />
                <br />
                <br />
                <TextField type="password" id="password" label="password" variant="outlined" className="width-full" onChange={handleChangePass} />
            </form>
            <br />
            <Button onClick={() => { props.onSubmit(email, password) }} variant="contained" color="primary" className="width-full">
                { props.view }
            </Button>
        </div>
    );
}

export default AuthForm; 