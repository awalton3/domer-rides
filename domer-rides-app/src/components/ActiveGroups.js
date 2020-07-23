import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import { UserContext } from '../common/UserContext';
import { GroupContext } from './Groups/GroupContext';
import Group from './Groups/Group';
import CircularProgress from '@material-ui/core/CircularProgress';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";


function ActiveGroups() {

    const spacer = {
        paddingTop: '85px',
        paddingLeft: '55px',
        paddingRight: '55px'
    }

    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const userModel = useContext(UserContext);
    const groupModel = useContext(GroupContext);
    let history = useHistory(); 

    useEffect(() => {
        fetchActiveGroups(userModel.getUserActiveGroups());
    }, [])

    function fetchActiveGroups(groupIds) {

        let temp_groups = [];
        let index = 0;
        if (!groupIds.length) {
            setLoaded(true); 
            return; 
        }
        groupIds.forEach(id => {
            groupModel.getGroup(id)
                .then(doc => {
                    if (doc.exists) {
                        let temp_group = {
                            id: doc.id,
                            data: doc.data()
                        }
                        temp_groups.push(temp_group)
                        console.log(temp_groups)
                    }
                    if (index == groupIds.length - 1) { //finished 
                        //Updating state
                        setGroups(temp_groups);
                        setLoaded(true);
                    }
                    index = index + 1;
                }).catch(error => console.log(error))
        })

    }

    const emptyGroupState = <Row className="justify-content-center height-half">
        <Col className="align-self-center all-center-width">
            <h3 className="center-text">No rides yet?</h3>
            <br/>
            <br/>
            <Button variant="contained" color="primary" className="width-full" onClick={() => { history.push('/') }}>Find a Ride</Button>
        </Col>
    </Row>

    return (
        <Container style={spacer} fluid>

            <Row>
                <Col className="justify-content-start no-gutters">
                    <h3>Active Groups</h3>
                </Col>
            </Row>

            <hr />

            {!loaded ?
                <Row className="justify-content-center height-half width-full no-gutters">
                    <Col className="align-self-center width-full">
                        <CircularProgress color="secondary" />
                    </Col>
                </Row> : ''}

            <div className="d-flex flex-wrap">
                {groups.map(group => <Group
                    key={group.id}
                    origin={group.data.origin}
                    dest={group.data.dest}
                    date={group.data.date}
                    members={group.data.members}
                    time={group.data.time}
                    disableJoin={true} />)}
            </div>

            {loaded && !groups.length ? emptyGroupState : ''}

        </Container>
    );
}

export default ActiveGroups; 