import React, { useContext, useEffect, useState } from 'react';
import Group from '../Group/Group';
import { GroupContext } from './GroupContext';
import Button from '@material-ui/core/Button';
import '../../App.css';

// Bootstrap Grid
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Groups(props) {

    console.log('component ran'); 

    // Initialize state
    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const groupModel = useContext(GroupContext);

    const userId = "ttttthhhhhuuuutttthhhuuuu";

    function createGroup() {
        setLoaded(false);
        groupModel.createGroup(props.origin, props.dest, props.time, userId)
            .then(res => {
                console.log('successfully created group');
                setLoaded(true);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        groupModel.fetchGroups(props.origin, props.dest, props.time)
        .then(querySnapshot => {
            let groups = []
            querySnapshot.forEach(doc => {
                let group = {
                    id: doc.id,
                    data: doc.data()
                }
                groups.push(group);
            });

            //Updating state
            setGroups(groups);
            setLoaded(true);
        })
        .catch(error => {
            console.log("Error getting documents: ", error);
        });
    }, []);

    return (
        <div>
            {groups.map(group => <Group origin={props.origin} dest={props.dest} time={props.time} members={group.data.members} />
            )}
            {!loaded ? <p>Loading....</p> : ''}
            {loaded && !groups.length ?
                <Container>
                    <Row className="justify-content-center height-full">
                        <Col className="align-self-center all-center-width">
                            <h3 className="center-text">No groups available.</h3>
                            <br/>
                            <Button onClick={createGroup} variant="contained" color="primary" className="width-full">Create a Group</Button>
                        </Col>
                    </Row>
                </Container> : ''}
        </div>
    );
}

export default Groups; 
