import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import logo from '../images/domerrides.png'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../App.css";
import { UserContext } from './UserContext';
import AppBar from '@material-ui/core/AppBar';
import StyledBadge from './StyledBadge';
import { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export default function Toolbar(props) {

    const userModel = useContext(UserContext) //goes null on refresh 
    let history = useHistory();
    let screenWide = window.innerWidth > 500;

    //const [numActiveGroups, setNumActiveGroups] = useState(userModel.getUserActiveGroups().length)

    // useEffect(() => {
    //     console.log(userModel)
    // })


    // const [screenWide, setScreenWide] = useState(window.innerWidth > 500); 

    // useEffect(() => {
    //     setNumActiveGroups(userModel.getUserActiveGroups().length);
    // }, [numActiveGroups])

    function onLogout() {
        userModel.logout()
            .then(() => console.log('user logged out'))
            .catch(error => console.log(error))
    }
    function navigateToSearch() {
        history.push('/search')
    }
    function navigateToActiveGroups() {
        console.log('hello')
        history.push('/active-groups')
    }

    const appBarDesktop = {
        top: 0,
        bottom: 'auto'
    }

    const appBarMobile = {
        top: 'auto',
        bottom: 0
    }

    return (
        <AppBar position="fixed" color="secondary" style={screenWide ? appBarDesktop : appBarMobile}>
            <Row className="justify-content-between toolbar no-gutters">

                {screenWide ?
                    <Col>
                        <h3>Domerrides</h3>
                    </Col> : ''
                }
                <Col>
                    <Row className="width-full toolbar-icons no-gutters">
                        {screenWide ? <Col></Col> : ''}
                        <Col xs={3} sm={2} md={1}>
                            <Tooltip title="Search">
                                <i className="material-icons" onClick={navigateToSearch}>search</i>
                            </Tooltip>

                        </Col>
                        <Col xs={3} sm={2} md={1}>
                            <Tooltip title="Active Groups">
                                <StyledBadge badgeContent={userModel.getUserActiveGroups().length} color="primary">
                                    <i className="material-icons" onClick={navigateToActiveGroups}>groups</i>
                                </StyledBadge>
                            </Tooltip>
                        </Col>
                        <Col xs={3} sm={2} md={1}>
                            <Tooltip title="History">
                                <i className="material-icons">history</i>
                            </Tooltip>
                        </Col>
                        <Col xs={3} sm={2} md={1}>
                            <Tooltip title="Logout">
                                <i className="material-icons" onClick={onLogout}>power_settings_new</i>
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </AppBar>
    );
}