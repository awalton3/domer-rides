import React, { useContext } from 'react';
import '../../App.css';
import { UserContext } from '../../common/UserContext';

function MyGroups() {

    console.log(useContext(UserContext))
    return (
        <div>
            <h1 className="center-text">Current Groups</h1>
            <hr />
            <h1 className="center-text">History</h1>
        </div>
    );
}

export default MyGroups; 