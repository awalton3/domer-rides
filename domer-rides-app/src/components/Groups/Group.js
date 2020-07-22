import React from 'react';

//Material UI - Cards 
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './Group.css';
import '../../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from '@material-ui/core/Badge';



// DRAFT: Group card 
function Group(props) {

    //TODO: add much better styling and create a css file to abstract styles
    const card = {
        position: 'relative',
        backgroundColor: '#eee',
        width: '350px',
        height: '300px',
        margin: '10px'
    }
    const button = {
        width: '97%',
        margin: ' 5px auto'
    }

    //Convert time 
    const departure = new Date(parseInt(props.time))
    console.log(departure)
    console.log(departure.getMonth())

    const joinButton = <Button onClick={props.onJoin} variant="outlined" color="primary" style={button}>Join</Button> 
    const leaveButton = <Button onClick={props.onLeave} variant="outlined" color="primary" style={button}>Leave Group</Button> 


    return (
        <Card style={card}>
            <CardContent>
                <Row className="top-right">
                    <Badge badgeContent={props.members.length} color="secondary">
                        <i className="material-icons">group</i>
                    </Badge>
                </Row>
                <br />
                <Row className="justify-content-center width-full no-gutters">
                    <span className="location">{props.origin}</span>
                    <i className="driving_icon material-icons">local_shipping</i>
                    <span className="location">{props.dest}</span>
                </Row>
                <Row className="justify-content-center width-full no-gutters">
                    <span>date</span>
                </Row>
                <Row className="justify-content-center width-full no-gutters bottom">
                    {props.disableJoin ? joinButton : leaveButton }
                </Row>
            </CardContent>
        </Card>
    );


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