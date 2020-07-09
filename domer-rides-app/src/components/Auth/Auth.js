import React, { useContext } from 'react';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useHistory } from "react-router-dom";

//Styles
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Auth.css';
import '../../App.css';
import { UserContext } from '../../common/UserContext';

function Auth(props) {

    // Grab auth service
    const auth = useContext(AuthContext);
    const userModel = useContext(UserContext)

    //Init component routing 
    let history = useHistory();

    // Conditionally show login and register views 
    const view = props.view ? props.view : 'login'
    let switch_prompt = "Don't have an account? Register."
    if (view === 'register') {
        switch_prompt = "Already have an account? Login.";
    }

    function handleAuth(email, password) {
        //TODO: add notifications (snack bar) for errors/successes
        //For now, see console for errors 
        if (view === 'login') {
            auth.login(email, password)
                .then(res => { //on success

                    //Update user model 
                    userModel.setUser(res.user.uid);  

                    //navigate to home
                    history.push('/search');
                })
                .catch(error => console.log(error))
        } else {
            auth.register(email, password)
                .then(res => { //on success 
                    //Add expanded user 
                    userModel.createUser(res.user.uid, email, 'soccerlady4')
                        .then(res => { console.log(res) })
                        .catch(error => console.log(error))
                    //navigate to login 
                    history.push('/login');
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