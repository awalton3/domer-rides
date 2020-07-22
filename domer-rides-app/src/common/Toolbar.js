import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import logo from '../images/domerrides.png'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../App.css";
import Button from '@material-ui/core/Button';
import { UserContext } from './UserContext';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';


export default function Toolbar(props) {

    const userModel = useContext(UserContext) //goes null on refresh 
    let history = useHistory();
    let screenWide = window.innerWidth > 500;


    // const [screenWide, setScreenWide] = useState(window.innerWidth > 500); 

    // useEffect(() => {
    //     console.log('reloaded')
    // }, [screenWide])

    function onLogout() {
        userModel.logout()
            .then(() => console.log('user logged out'))
            .catch(error => console.log(error))
    }
    function navigateToSearch() {
        history.push('/search')
    }

    const appBarDesktop = {
        top: 0,
        bottom: 'auto'
    }

    const appBarMobile = {
        top: 'auto',
        bottom: 0
    }

    const StyledBadge = withStyles((theme) => ({
        badge: {
          right: '25px',
          top: '5px',
          padding: '0 4px',
        },
      }))(Badge);

    // <Row>
    //     <Badge badgeContent={3} color="primary">
    //         <i className="material-icons">groups</i>
    //     </Badge>
    // </Row>

    console.log(window.innerWidth)

    return (
        <AppBar position="fixed" color="secondary" style={screenWide ? appBarDesktop : appBarMobile}>
            <Row className="justify-content-between toolbar no-gutters">

                {screenWide ?
                    <Col>
                        <h3>Domerries</h3>
                    </Col> : ''
                }
                <Col>
                    <Row className="width-full toolbar-icons no-gutters">
                        { screenWide ? <Col></Col> : ''}
                        <Col xs={3} sm={2} md={1}>
                            <i className="material-icons" onClick={navigateToSearch}>search</i>
                        </Col>
                        <Col xs={3} sm={2} md={1}>
                            <StyledBadge badgeContent={3} color="primary">
                                <i className="material-icons">groups</i>
                            </StyledBadge>
                        </Col>
                        <Col xs={3} sm={2} md={1}>
                            <i className="material-icons">history</i>
                        </Col>
                        <Col xs={3} sm={2} md={1}>
                            <i className="material-icons" onClick={onLogout}>power_settings_new</i>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </AppBar>
    );
}