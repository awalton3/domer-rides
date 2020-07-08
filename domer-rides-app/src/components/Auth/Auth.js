import React, { useContext } from 'react';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Auth.css';
import '../../App.css';


import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useHistory } from "react-router-dom";


function Auth(props) {

    const auth = useContext(AuthContext);
    let history = useHistory();

    // const [ view, setView ] = useState(props.view ? props.view : 'login'); 

    const view = props.view ? props.view : 'login'
    let switch_prompt = "Don't have an account? Register."
    if (view === 'register') {
        switch_prompt = "Already have an account? Login.";
    }

    function handleAuth(email, password) {
        //TODO: add notifications (snack bar) of errors 
        if (view === 'login') {
            auth.login(email, password)
                .then(() => {
                    history.push('/');
                })
                .catch(error => console.log(error))
        } else {
            auth.register(email, password)
                .then(() => {
                    history.push('/register');
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <Container className="auth-bg-color" fluid>
            <Row className="justify-content-center height-full">
                <Col className="align-self-center auth-container-width">
                    <AuthForm view={view}
                        onSubmit={(email, password) => { handleAuth(email, password) }} />
                    <br />
                    <Link to={`/${view === 'login' ? 'register' : 'login'}`}>
                        <p className="center-text">{switch_prompt}</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Auth; 