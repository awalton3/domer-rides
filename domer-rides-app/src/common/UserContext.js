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
            updateUser: this.setUser.bind(this),
            updateUserActiveGroups: this.updateUserActiveGroups,
            getCurrentUser: this.getCurrentUser,
            setUserInSessionStorage: this.setUserInSessionStorage,
            getUserActiveGroups: this.getUserActiveGroups
        }
    }

    componentWillMount() {
        // Subscribe to auth observer 
        this.authListener = auth.onAuthStateChanged(user => {
            this.setState({ isAuthenticated: !!user });
            if (user) {
                this.getUser(user.uid)
                    .then(userRes => {
                        const uid = userRes.id
                        const userObj = userRes.data()
                        this.setState(Object.assign({}, {
                            user: { ...userObj, ...{ uid: uid } }
                        }));
                        this.setUserInSessionStorage({ ...userObj, ...{ uid: uid } })
                    }).catch(error => console.log(error))
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

    setUser(userObj) {
        this.setState({ user: userObj });
    }

    getUser(id) {
        return db.collection(this.state.collection).doc(id).get();
    }

    getCurrentUser() {
        return sessionStorage.getItem("user");
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
        }), Promise.resolve(updatedArray)
    }

    // updateUser(userObj) {
    //     this.setState({ user: userObj });
    // }

    deleteUser(id) {
        return db.collection(this.collection).doc(id).delete();
        //TODO: delete user in static Authentication collection too 
    }

    setUserInSessionStorage(user) {
        Object.keys(user).forEach(attr => {
            if (attr === 'activeGroups') {
                if (user[attr].length) {
                    sessionStorage.setItem(attr, user[attr].join(', '));
                }
            } else {
                sessionStorage.setItem(attr, user[attr]);
            }
        });
    }

    getUserFromSessionStorage() {
        return sessionStorage.getItem("user");
    }

    getUserActiveGroups() {
        if (!sessionStorage.getItem("activeGroups")) return [];
        return sessionStorage.getItem("activeGroups").split(", ")
    }

    logout() {
        sessionStorage.clear();
        return auth.signOut();
    }

    componentWillUnmount() {
        this.authListener = undefined;
    }
}

export default UserContextProvider;


