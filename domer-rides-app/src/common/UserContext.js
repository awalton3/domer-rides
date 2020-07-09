import React, { Component } from "react";
import { createContext } from "react";
import { firestore as db } from '../firebase';

export const UserContext = createContext();

class UserContextProvider extends Component {

    constructor() {
        super()
        this.state = {
            collection: 'Users/',
            userId: '',
            setUser: this.setUser.bind(this), 
            createUser: this.createUser,
            deleteUser: this.deleteUser,
            getUser: this.getUser, 
        }
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
        return db.collection(this.collection).doc(id).get(); 
    }

    createUser(id, email, username) {
        return db.collection(this.collection).doc(id).set({
            email: email, 
            username: username, 
            activeGroups: []
        }); 
    }

    deleteUser(id) {
        return db.collection(this.collection).doc(id).delete(); 
        //TODO: delete user in static Authentication collection too 
    } 
}

export default UserContextProvider;


