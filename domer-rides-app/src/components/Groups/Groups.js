import React, { useContext, useEffect, useState } from 'react';
import Group from './Group';
import { GroupContext } from './GroupContext';
import { UserContext } from '../../common/UserContext';

// Styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import '../../App.css';

function Groups(props) {

    // Initialize state
    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const groupModel = useContext(GroupContext);
    //const userModel = useContext(UserContext);
    // on refresh, userId on user model disappears, so using this temporarily
    const userId = 'iOQWJziUw0MiiuR6ef1AqglCFSr1';

    function createGroup() {
        setLoaded(false);
        groupModel.createGroup(props.origin, props.dest, props.time, userId)
            .then(res => {
                fetchGroups(); 
                setLoaded(true); 
            })
            .catch(error => console.log(error))
    }

    function fetchGroups() {
        //TODO: remove some complexity here and put it in the context 
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
    }

    useEffect(() => {
        fetchGroups(); 
    }, []);

    return (
        <Container>
            {groups.map(group => <Group key={group.id} origin={props.origin} dest={props.dest} time={props.time} members={group.data.members} />
            )}
            {!loaded ?
                <Row className="justify-content-center height-full">
                    <Col className="align-self-center all-center-width">
                        <p className="center-text">Loading....</p>
                    </Col>
                </Row> : ''}
            {loaded && !groups.length ?
                <Row className="justify-content-center height-full">
                    <Col className="align-self-center all-center-width">
                        <h3 className="center-text">No groups available.</h3>
                        <br />
                        <Button onClick={createGroup} variant="contained" color="primary" className="width-full">Create a Group</Button>
                    </Col>
                </Row> : ''}
        </Container>
    );
}

export default Groups; 
