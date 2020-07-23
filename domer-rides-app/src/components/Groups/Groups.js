import React, { useContext, useEffect, useState } from 'react';
import Group from './Group';
import { GroupContext } from './GroupContext';
import { UserContext } from '../../common/UserContext';
import { MAX_MEMBERS } from '../../common/constants';
import { full_name } from '../../common/constants';
import { days } from '../../common/constants';
import { months } from '../../common/constants';
import { useHistory } from "react-router-dom";

// Styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../App.css';
import './Group.css';
import AddGroupModal from './AddGroupModal';

function Groups(props) {

    const spacer = {
        paddingTop: '85px',
        paddingLeft: '55px',
        paddingRight: '55px'
    }

    // Initialize state
    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [justJoined, setJustJoined] = useState(false); 
    const uid = sessionStorage.getItem("uid")
    const departure = new Date(parseInt(props.time));
    const month_day = days[departure.getDay()] + ", " + months[departure.getMonth()] + " " + departure.getDate()
    const groupModel = useContext(GroupContext);
    const userModel = useContext(UserContext);
    let history = useHistory(); 

    function createGroup(depart_time) {
        setLoaded(false);
        groupModel.createGroup(props.origin, props.dest, props.time, uid, depart_time)
            .then(groupId => {
                userModel.updateUserActiveGroups(uid, groupId)
                    .then(updatedActiveGroups => {
                        //Update user model 
                        //let temp = Object.assign({}, userModel.user);
                        //temp.activeGroups = updatedActiveGroups;
                        //userModel.updateUser(temp);
                        userModel.setUserInSessionStorage({ activeGroups: updatedActiveGroups }); 
                        fetchGroups();
                    })
                    .catch(error => console.log(error))
            }).catch(error => console.log(error));
    }

    function fetchGroups() {
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
        //const updateGroup = groupModel.updateGroupMembers(group.id, uid, group.data.members);
        //const updateUser = userModel.updateUserActiveGroups(uid, group.id);

        //TODO: add atomicity for code below...

        //Check group size
        if (group.data.members.length == MAX_MEMBERS - 1) {
            tasks.push(groupModel.closeGroup());
        }

        groupModel.updateGroupMembers(group.id, uid, group.data.members)
            .then(() => {
                //Update user 
                userModel.updateUserActiveGroups(uid, group.id)
                    .then(updatedActiveGroups => {
                        userModel.setUserInSessionStorage({ activeGroups: updatedActiveGroups }); 
                        history.push('/active-groups'); 
                    }).catch(error => console.log(error)); 
            }).catch(error => console.log(error)); 

        // Promise.all([...tasks, updateGroup, updateUser])
        //     .then((res, updatedActiveGroups) => {
        //         //Update user model 
        //             userModel.setUserInSessionStorage({ activeGroups: updatedActiveGroups }); 
        //         //setJustJoined(true); 
        //         //fetchGroups()
        //         history.push('/active-groups'); 
        //         //let temp = Object.assign({}, userModel.user);
        //         //temp.activeGroups = updatedActiveGroups;
        //     }).catch(error => console.log(error))
    }

    useEffect(() => {
        fetchGroups();
        console.log("Props: ", props); 
    }, [justJoined]);

    const emptyGroupState = <Row className="justify-content-center height-half">
        <Col className="align-self-center all-center-width">
            <h3 className="center-text">No groups available.</h3>
        </Col>
    </Row>

    return (
        <Container style={spacer} fluid>
            <Row>
                <Col>
                    <Row className="justify-content-start no-gutters">
                        <span>{full_name[props.origin]}</span>
                        <i className="arrow_icon material-icons">double_arrow</i>
                        <span>{full_name[props.dest]}</span>
                    </Row>
                    <Row className="justify-content-start no-gutters">
                        <span className="location">{props.origin}</span>
                        <i className="driving_icon material-icons">local_shipping</i>
                        <span className="location">{props.dest}</span>
                    </Row>
                </Col>
                <Col className="align-self-end" md={6}>
                    <Row className="justify-content-start justify-content-lg-end no-gutters">
                        <span className="location">{month_day}</span>
                    </Row>
                </Col>
            </Row>
            <hr />
            <div className="d-flex flex-wrap">
                {groups.map(group => <Group
                    key={group.id}
                    origin={props.origin}
                    dest={props.dest}
                    date={props.time}
                    members={group.data.members}
                    time={group.data.time}
                    disableJoin={userModel.getUserActiveGroups().includes(group.id)}
                    onJoin={() => joinGroup(group)} />)}
            </div>
            {!loaded ?
                <Row className="justify-content-center height-full no-gutters">
                    <Col className="align-self-center all-center-width">
                        <CircularProgress color="secondary" />
                    </Col>
                </Row> : ''}
            {loaded && !groups.length ? emptyGroupState : ''}
            <AddGroupModal onAdd={(time) => createGroup(time)}></AddGroupModal>
        </Container>
    );
}

export default Groups; 
