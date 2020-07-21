import React, { useContext } from 'react';
import logo from '../images/domerrides.png'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../App.css";
import  Button  from '@material-ui/core/Button';
import { UserContext } from './UserContext';

export default function Toolbar(props) {

    const user = useContext(UserContext)

    function onLogout() {
        user.logout()
            .then(() => console.log('user logged out'))
            .catch(error => console.log(error))
    }

    //TODO: Add menu for hamburger icon 

    return (
        <Row className="justify-content-between toolbar no-gutters primary-bg">
            <Col>
                <i className="material-icons">notes</i>
            </Col>
            <span className="toolbar-user">
                <Button onClick={onLogout} variant="outlined" color="primary">
                        Logout
                 </Button>
            </span>
        </Row>
    );
}