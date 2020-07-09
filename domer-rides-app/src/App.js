import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components 
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth.js';
import Groups from './components/Groups/Groups';
import MyGroups from './components/MyGroups/MyGroups';

// Services/Models 
import AuthContextProvider from './components/Auth/AuthContext'
import GroupContextProvider from './components/Groups/GroupContext';
import UserContextProvider from './common/UserContext';

function App() {
  return (
    <Router>
      <Switch>

        <UserContextProvider>

          <Route path={'/search'} exact component={Home}></Route>

          <Route path={'/groups/:origin/:dest/:time'} exact
            render={({ match }) => <GroupContextProvider><Groups origin={match.params.origin} dest={match.params.dest} time={match.params.time}></Groups></GroupContextProvider>}>
          </Route>

          <Route path={'/my-groups'} exact component={MyGroups}></Route>

          <Route path={['/', '/login']} exact
            render={() => <AuthContextProvider>
              <Auth view={'login'} />
            </AuthContextProvider>}>
          </Route>

          <Route path={'/register'} exact
            render={() => <AuthContextProvider>
              <Auth view={'register'} />
            </AuthContextProvider>}>
          </Route>

        </UserContextProvider>

      </Switch>
    </Router>
  );
}

export default App;
