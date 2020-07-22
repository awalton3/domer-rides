import React, { Component } from "react";
import { createContext } from "react";
import { firestore as db } from '../../firebase';
// import { UserContext } from '../../common/UserContext';

export const GroupContext = createContext();

class GroupContextProvider extends Component {

    constructor() {
        super()
        this.state = {
            createGroup: this.createGroup,
            closeGroup: this.closeGroup, 
            fetchGroups: this.fetchGroups, 
            createGroupId: this.createGroupId,
            getDbPath: this.getDbPath,
            parseGroupId: this.parseGroupId,
            updateGroupMembers: this.updateGroupMembers
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
            members: [userId],
            owner: userId
        }); 
    }

    fetchGroups(origin, dest, time) {
        const dbPath = this.getDbPath(origin, dest, time); 
        return db.collection(dbPath).get(); 
    }

    // Utility Methods 
    createGroupId(origin, dest, time) {
        return origin + '_' + dest + '_' + time + '_' + (new Date()).getTime(); 
    }

    parseGroupId(groupId) {
        return groupId.split('_'); 
    }

    getDbPath(origin, dest, time) {
        return 'Origin/' + origin + '/Destination/' + dest + '/On/' + time + '/Groups/';  
    } 

    updateGroupMembers(groupId, userId, currMembers) {
        console.log("updateGroupMembers: ", groupId, userId, currMembers)
        console.log("function: ", this.parseGroupId(groupId)); 
        const [origin, dest, depart_time, created_at] = this.parseGroupId(groupId); 
        const dbPath = this.getDbPath(origin, dest, depart_time)
        return db.collection(dbPath).doc(groupId).update({
            members: [...currMembers, userId]
        })
    }

    closeGroup(groupObj) {
        // Get parameters
        const [origin, dest, depart_time, created_at] = this.parseGroupId(groupObj.id); 
        const dbPath = this.getDbPath(origin, dest, depart_time)

        // Update firebase collections
        const removeGroupFromMain = db.collection(dbPath).doc(groupObj.id).delete()
        /////const update 
        const addGroupToClosedCollection = db.collection('Closed/').doc(groupObj.id).set(groupObj.data)
        return Promise.all ([removeGroupFromMain, addGroupToClosedCollection]); 
    }
}

export default GroupContextProvider;


