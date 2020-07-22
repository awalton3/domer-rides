import React from 'react';

//Material UI - Cards 
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


// DRAFT: Group card 
function Group(props) {
    //TODO: add much better styling and create a css file to abstract styles
    const cardWidth = {
        width: '350px',
        margin: '10px'
    }
    console.log(props.disableJoin); 
    return (
        <Card style={cardWidth}>
            <CardContent>
                <span>{ props.origin }</span> TO <span>{ props.dest }</span>
                <p>Time: { props.time }</p>
                <p>Members</p>
                <ul>
                    { (props.members).map(member => <li key={member}>{member}</li> )}
                </ul>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={ props.onJoin } disabled={props.disableJoin}>Join</Button>
            </CardActions>
        </Card>
    );
}

export default Group; 