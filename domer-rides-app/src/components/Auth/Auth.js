import React, { useContext, useState } from 'react';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useHistory } from "react-router-dom";
import logo from "./../../images/domerrides.png"

//Styles
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Snackbar from '@material-ui/core/Snackbar';
import './Auth.css';
import '../../App.css';

import { UserContext } from '../../common/UserContext';
import Alert from '../../common/Alert';


function Auth(props) {

    //Init state
    const [openError, setOpenError] = useState({ open: false, message: '' })
    const [openSuccess, setOpenSuccess] = useState({ open: false, message: '' })
    const auth = useContext(AuthContext);
    const userModel = useContext(UserContext)
    let history = useHistory();

    //Auto Login 
    if (userModel.isAuthenticated) {
        history.push('/');
    }

    // Conditionally show login and register views 
    const view = props.view ? props.view : 'login'
    let switch_prompt = "Don't have an account? Register."
    if (view === 'register') {
        switch_prompt = "Already have an account? Login.";
    }

    function updateUserModel(uid) {
        userModel.getUser(uid)
            .then(userRes => {
                console.log("YELLOO:, ", userRes)
                // const uid = userRes.id
                const userObj = userRes.data()
                userModel.setUserInSessionStorage({ user: { ...userObj, ...{ uid: uid } } });
            }).catch(error => console.log(error));
    }

    function handleAuth(email, password, username) {
        if (view === 'login') {
            auth.login(email, password)
                .then(res => {
                    //console.log("Login: ", res.user); 
                     updateUserModel(res.user.uid);
                    // userModel.getUser(res.user.uid)
                    //     .then(userRes => {
                    //         console.log("YELLOO:, ", userRes)
                    //         // const uid = userRes.id
                    //         const userObj = userRes.data()
                    //.setUserInSessionStorage({ user: { ...userObj, ...{ uid: res.user.uid } } });
                    //         // Navigate to home 
                    //         history.push('/search');
                    //     }).catch(error => console.log(error));
                    history.push('/search');

                }).catch(error => {
                    setOpenError({ open: true, message: auth.getErrorMess(error.code) })
                })
        } else {
            auth.register(email, password)
                .then(res => {
                    const fbUserObj = res.user;
                    //Add expanded user 
                    userModel.createUser(res.user.uid, email, username)
                        .then(res => {
                            setOpenSuccess({ open: true, message: 'Successfully created an account' })
                            updateUserModel(fbUserObj.uid); //should possibly set directly to avoid extra http request.
                            history.push('/login');
                        }).catch(error => { console.log(error) })
                }).catch(error => setOpenError({ open: true, message: auth.getErrorMess(error.code) }))
        }
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        //setOpen(false);
    };

    return (
        <Container className="auth-bg-color" fluid>
            <Snackbar
                open={openError.open}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                className="width-full">
                <Alert onClose={handleSnackBarClose} severity="error" className="all-center-width">
                    {openError.message}
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSuccess.open}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                className="width-full">
                <Alert onClose={handleSnackBarClose} severity="error" className="all-center-width">
                    {openSuccess.message}
                </Alert>
            </Snackbar>
            <Row className="justify-content-center height-full">
                <Col className="align-self-center auth-container-width">
                    <img src={logo} alt="logo" width="330px" />
                    <AuthForm view={view}
                        onSubmit={(email, password, username) => handleAuth(email, password, username)} />
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