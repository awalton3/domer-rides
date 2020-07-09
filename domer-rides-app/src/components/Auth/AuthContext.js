import React, { Component } from "react";
import { createContext } from "react";
import { auth } from '../../firebase';

export const AuthContext = createContext();

class AuthContextProvider extends Component {

    constructor() {
        super()
        this.state = {
            login: this.login,
            register: this.register
        }
    }

    render() {
        return (
            <AuthContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }

    // Methods 
    login(email, password) {
        //TODO: add google sign in 
        return auth.signInWithEmailAndPassword(email, password); 
    }

    register(email, password) {
        //TODO: add notre dame email verification 
        return auth.createUserWithEmailAndPassword(email, password); 
    }
}

export default AuthContextProvider;


