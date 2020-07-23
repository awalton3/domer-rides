import React from 'react';
import { days, months } from '../../common/constants';

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
        width: '300px',
        height: '320px',
        margin: '10px'
    }
    const button = {
        width: '90%',
        margin: ' 5px auto'
    }

    //Convert time 
    const departure = new Date(parseInt(props.date))
    // const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month_day = days[departure.getDay()] + ", " + months[departure.getMonth()] + " " + departure.getDate()
    const time = tConvert(props.time)

    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
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
                <p>{ props.id } </p>
                <p className="date_time center-text">{time}</p>
                <Row className="justify-content-center width-full no-gutters">
                    {props.disableJoin ? leaveButton : joinButton }
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