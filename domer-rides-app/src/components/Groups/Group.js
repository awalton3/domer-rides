import React from 'react';

//Material UI - Cards 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './Group.css';
import '../../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from '@material-ui/core/Badge';


// DRAFT: Group card 
function Group(props) {

    const card = {
        position: 'relative',
        backgroundColor: '#eee',
        width: '320px',
        height: '320px',
        margin: '10px'
    }
    const button = {
        width: '90%',
        margin: ' 5px auto'
    }

    //Convert time 
    const departure = new Date(parseInt(props.time))
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month_day = days[departure.getDay()] + ", " + months[departure.getMonth()] + " " + departure.getDate()
    const time = formatAMPM(departure)

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const joinButton = <Button onClick={props.onJoin} variant="outlined" color="primary" style={button}>Join</Button>
    const leaveButton = <Button onClick={props.onLeave} variant="outlined" color="primary" style={button}>Leave Group</Button>

    return (
        <Card style={card}>
            <CardContent>
                <Row className="justify-content-between width-full no-gutters">
                    <Col className="align-self-center">
                        <span className="location-sm">{props.origin}</span>
                        <i className="driving-icon-sm material-icons">local_shipping</i>
                        <span className="location-sm">{props.dest}</span>
                        <br />
                        <p>{month_day}</p>
                    </Col>
                    <Col className="align-self-start right-text">
                        <Badge badgeContent={props.members.length} color="secondary">
                            <i className="group-icon material-icons">group</i>
                        </Badge>
                    </Col>
                </Row>
                <br />
                <p className="date_time center-text">{month_day}</p>
                <p className="date_time center-text">{time}</p>
                <Row className="justify-content-center width-full no-gutters">
                    {props.disableJoin ? joinButton : leaveButton}
                </Row>
            </CardContent>
        </Card>
    );



    // return (
    //     <Card style={card}>
    //         <CardContent>
    //             <Row className="top-right"> 
    //                 <Badge badgeContent={props.members.length} color="secondary">
    //                     <i className="material-icons">group</i>
    //                 </Badge>
    //             </Row>
    //             <br />
    //             <Row className="justify-content-center width-full no-gutters">
    //                 <span className="location-sm">{props.origin}</span>
    //                 <i className="driving_icon-sm material-icons">local_shipping</i>
    //                 <span className="location-sm">{props.dest}</span>
    //             </Row>
    //             <Row className="justify-content-center width-full no-gutters">
    //                 <p className="date_time">{ month_day }</p> 
    //                 <p className="date_time">{ time }</p>
    //             </Row>
    //             <Row className="justify-content-center width-full no-gutters bottom">
    //                 {props.disableJoin ? joinButton : leaveButton }
    //             </Row>
    //         </CardContent>
    //     </Card>
    // );


    // return (
    //     <Card style={cardWidth}>
    //         <CardContent>
    //             <span>{ props.origin }</span> TO <span>{ props.dest }</span>
    //             <p>Time: { props.time }</p>
    //             <p>Members</p>
    //             <ul>
    //                 { (props.members).map(member => <li key={member}>{member}</li> )}
    //             </ul>
    //         </CardContent>
    //         <CardActions>
    //             <Button size="small" onClick={ props.onJoin } disabled={props.disableJoin}>Join</Button>
    //         </CardActions>
    //     </Card>
    // );
}

export default Group; 