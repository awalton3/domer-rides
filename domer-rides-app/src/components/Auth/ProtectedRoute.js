import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../common/UserContext';
import { auth } from '../../firebase';

function ProtectedRoute({ render: render, ...rest }) {

    const user = useContext(UserContext)

    return (
        <Route {...rest} render={() => {
            if (user.isAuthenticated) {
                return <Route {...rest} render={render} />
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