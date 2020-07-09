import React, { Component } from "react";
import { createContext } from "react";
import { firestore as db } from '../../firebase';

export const GroupContext = createContext();

class GroupContextProvider extends Component {

    constructor() {
        super()
        this.state = {
            createGroup: this.createGroup,
            fetchGroups: this.fetchGroups, 
            createGroupId: this.createGroupId,
            getDbPath: this.getDbPath
        }
    }

    render() {
        return (
            <GroupContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </GroupContext.Provider>
        );
    }

    // Query Methods 
    createGroup(origin, dest, time, userId) {
        const groupId = this.createGroupId(origin, dest, time); 
        const dbPath = this.getDbPath(origin, dest, time)
        return db.collection(dbPath).doc(groupId).set({
            origin: origin, 
            dest: dest, 
            time: time, 
            members: [userId]
        }); 
    }

    fetchGroups(origin, dest, time) {
        const dbPath = this.getDbPath(origin, dest, time); 
        return db.collection(dbPath).get(); 
    }

    // Utility Methods 
    createGroupId(origin, dest, time) {
        return origin + '_' + dest + '_' + time + (new Date()).getTime(); 
    }

    parseGroupId(groupId) {
        return groupId.split('_'); 
    }

    getDbPath(origin, dest, time) {
        return 'Origin/' + origin + '/Destination/' + dest + '/On/' + time + '/Groups/';  
    } 

    // joinGroup(groupId, userId) {
    //     //TODO: write this method 
    // } 
}

export default GroupContextProvider;


