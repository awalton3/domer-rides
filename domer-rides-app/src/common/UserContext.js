import React, { Component } from "react";
import { createContext } from "react";
import { firestore as db } from '../firebase';
import { auth } from '../firebase';

export const UserContext = createContext();

class UserContextProvider extends Component {

    constructor() {
        super()
        this.state = {
            collection: 'Users/',
            user: null, 
            setUser: this.setUser.bind(this),
            createUser: this.createUser,
            deleteUser: this.deleteUser,
            getUser: this.getUser,
            logout: this.logout,
            updateUser: this.updateUser,
            updateUserActiveGroups: this.updateUserActiveGroups
        }
    }

    componentWillMount() {
        // Subscribe to auth observer 
        auth.onAuthStateChanged(user => {
            this.setState({ isAuthenticated: !!user });
            if (user) {
                this.getUser(user.uid)
                    .then(userRes => {
                        const uid = userRes.id
                        const userObj = userRes.data()
                        this.setState({ 
                            user: {...userObj, ...{ uid: uid }} 
                        }); 
                    })
                    .catch(error => console.log(error))
            }
        });
    }

    render() {
        return (
            <UserContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }

    setUser(id) {
        this.setState({ userId: id });
    }

    getUser(id) {
        return db.collection(this.state.collection).doc(id).get();
    }

    createUser(id, email, username) {
        return db.collection(this.collection).doc(id).set({
            email: email,
            username: username,
            activeGroups: []
        });
    }

    updateUserActiveGroups(uid, groupId, remove) {
       const updatedArray = !remove ? [...this.user.activeGroups, groupId] : this.user.activeGroups.splice(this.user.activeGroups.indexOf(groupId), 1); 
        return db.collection(this.collection).doc(uid).update({
            activeGroups: updatedArray
        })
    }

    deleteUser(id) {
        return db.collection(this.collection).doc(id).delete();
        //TODO: delete user in static Authentication collection too 
    }

    logout() {
        return auth.signOut();
    }
}

export default UserContextProvider;


