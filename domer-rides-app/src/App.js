import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


// Components 
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth.js';
import Groups from './components/Groups/Groups';
import MyGroups from './components/MyGroups/MyGroups';


// Services/Models 
import AuthContextProvider from './components/Auth/AuthContext'
import GroupContextProvider from './components/Groups/GroupContext';
import UserContextProvider from './common/UserContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D39F10'
    },
    secondary: {
      main: '#0C2340'
    }
  },
});

function App() {
  return (

    <ThemeProvider theme={theme}>
      <Router>
        <Switch>

          <UserContextProvider>

            <ProtectedRoute path={['/', '/search']} exact render={() => <Home />}></ProtectedRoute>

            <ProtectedRoute path={'/groups/:origin/:dest/:time'} exact
              render={({ match }) => <GroupContextProvider><Groups origin={match.params.origin} dest={match.params.dest} time={match.params.time}></Groups></GroupContextProvider>}>
            </ProtectedRoute>

            <ProtectedRoute path={'/my-groups'} exact render={() => <MyGroups />}></ProtectedRoute>

            <Route path={'/login'} exact
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
    </ThemeProvider>

  );
}

export default App;
