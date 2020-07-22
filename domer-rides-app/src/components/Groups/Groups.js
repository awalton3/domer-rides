import React, { useContext, useEffect, useState } from 'react';
import Group from './Group';
import { GroupContext } from './GroupContext';
import { UserContext } from '../../common/UserContext';
import { MAX_MEMBERS } from '../../common/constants';

// Styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../App.css';

function Groups(props) {

    // Initialize state
    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const groupModel = useContext(GroupContext);
    const userModel = useContext(UserContext);

    function createGroup() {
        setLoaded(false);
        groupModel.createGroup(props.origin, props.dest, props.time, userModel.user.uid)
            .then(res => fetchGroups())
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

    function joinGroup(group) {
        console.log("Group in groups component: ", group);
        console.log("User in Groups component: ", userModel);

        // TODO: Check if user has a time conflict 

        const tasks = []
        const updateGroup = groupModel.updateGroupMembers(group.id, userModel.user.uid, group.data.members);
        const updateUser = userModel.updateUserActiveGroups(userModel.user.uid, group.id);

        //TODO: add atomicity for code below...

        //Check group size
        if (group.data.members.length == MAX_MEMBERS - 1) {
            tasks.push(groupModel.closeGroup()); 
        }

        Promise.all([...tasks, updateGroup, updateUser])
            .then(res => {
                console.log('successfully joined group')
                fetchGroups(); 
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <Container>
            {loaded && groups.length ? <div><h1>Groups</h1><hr /></div> : ''}
            {groups.map(group => <Group key={group.id} origin={props.origin} dest={props.dest} time={props.time} members={group.data.members} disableJoin={userModel.user.activeGroups.includes(group.id)} onJoin={() => joinGroup(group)} />
            )}
            {!loaded ?
                <Row className="justify-content-center height-full">
                    <Col className="align-self-center all-center-width">
                        <CircularProgress color="secondary" />
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
