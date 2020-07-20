import React, { Component } from "react";
import { createContext } from "react";
import { auth } from '../../firebase';

export const AuthContext = createContext();

class AuthContextProvider extends Component {

    constructor() {
        super()
        this.state = {
            login: this.login,
            register: this.register,
            logout: this.logout,
            getErrorMess: this.getErrorMess
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

    logout() {
        return auth.signOut; 
    }

    getErrorMess(errorCode) {

        switch (errorCode) {
    
          //login
          case 'auth/invalid-email':
            return 'Your email is invalid.'
          case 'auth/user-disabled':
            return 'Your account is disabled.'
          case 'auth/user-not-found':
            return 'Your email is not registered.'
          case 'auth/wrong-password':
            return ('Your password is invalid.')
    
          //register
          case 'auth/email-already-in-use':
            return('Email already in use')
          case 'auth/invalid-email':
            return('Email address is invalid')
          case 'auth/operation-not-allowed':
            return('Operation not allowed');
          case 'auth/weak-password':
            return('Password is weak');
          default: 
            return 'An error occurred.'
    
          //reset
        //   case 'auth/invalid-email':
        //     this.onError('Email invalid');
        //     break;
        //   case 'auth/user-not-found':
        //     this.onError('No user found');
        //     break;
    
        }
      }

}

export default AuthContextProvider;


