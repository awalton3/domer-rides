import React, { useContext, useEffect, useState } from 'react';
import Group from '../Group/Group';
import { GroupContext } from './GroupContext';
import Button from '@material-ui/core/Button';

function Groups(props) {

    console.log(props);

    // Initialize state
    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const groupModel = useContext(GroupContext);

    // Fake user input 
    // const test = {
    //     origin: "ND",
    //     dest: "MDW",
    //     time: 1594181989744,
    //     members: ['user1', 'user2', 'user3']
    // // };
    const userId = "ttttthhhhhuuuutttthhhuuuu";
    // const time = (new Date()).getTime();

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
            .then(function (querySnapshot) {
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
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    })

    return (
        // <p>hello</p>
        <div>
            {groups.map(group => <Group origin={props.origin} dest={props.dest} time={props.time} members={group.data.members} />
            )}
            {!loaded ? <p>Loading....</p> : ''}
            {loaded && !groups.length ? <Button onClick={createGroup}>Create a Group</Button> : ''}
        </div>
    );
}

export default Groups; 
