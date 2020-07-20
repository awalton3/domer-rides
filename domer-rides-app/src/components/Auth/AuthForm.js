import React, {useState} from 'react'

// Material UI Forms 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AuthForm(props) {

    // Create models for inputs 
    const [ email, setEmail ] = useState('');
    const [ password, setPass ] = useState('');
    const [ username, setUsername ] = useState('');

    //Manage input changes 
    function handleChangeEmail(event) {
        setEmail(event.target.value); 
    }
    function handleChangePass(event) {
        setPass(event.target.value); 
    }
    function handleChangeUsername(event) {
        setUsername(event.target.value); 
    }

    const input = {
        'width': '100%',
        'paddingBottom': '7px',
    }

    return (
        <div>
            <form noValidate autoComplete="off" className="width-full">
                { props.view === 'register' ? <TextField id="name" label="username" variant="outlined" style={input} onChange={handleChangeUsername}/> : '' }
                <TextField id="email" label="email" variant="outlined" style={input} onChange={handleChangeEmail}/>
                <TextField type="password" id="password" label="password" variant="outlined" style={input} onChange={handleChangePass} />
            </form>
            <br />
            <Button onClick={() => { props.onSubmit(email, password, username) }} variant="contained" color="primary" className="width-full accent-bg">
                { props.view }
            </Button>
        </div>
    );
}

export default AuthForm; 