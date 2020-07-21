import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../common/UserContext';
import { auth } from '../../firebase';
import Toolbar from '../../common/Toolbar';

function ProtectedRoute({ render: render, ...rest }) {

    const user = useContext(UserContext)

    return (
        <Route {...rest} render={() => {
            if (user.isAuthenticated) {
                return <span><Toolbar /><Route {...rest} render={render} /></span>
            } else if (user.isAuthenticated === undefined) {
                return <p>Loading...</p>
            } else {
                console.log(user.isAuthenticated);
                return <Redirect to={{ pathname: '/login' }} />
            }
        }} />
    )
}


export default ProtectedRoute; 