import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth.js';
import AuthContextProvider from './components/Auth/AuthContext'

import Groups from './components/Groups/Groups';
import GroupContextProvider from './components/Groups/GroupContext';

function App() {
  return (
    // need to conditionally render the auth component 
    <Router>
      <Switch>

        <Route path={'/'} exact component={Home}></Route>

        <Route path={'/groups/:origin/:dest/:time'} 
          render={({ match }) => <GroupContextProvider><Groups origin={match.params.origin} dest={match.params.dest} time={match.params.time}></Groups></GroupContextProvider>}>
        </Route>

        <Route path={'/login'}
          render={() => <AuthContextProvider>
            <Auth view={'login'} />
          </AuthContextProvider>}>
        </Route>

        <Route path={'/register'}
          render={() => <AuthContextProvider>
            <Auth view={'register'} />
          </AuthContextProvider>}>
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
