import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth.js';
import AuthContextProvider from './components/Auth/AuthContext'

function App() {
  return (
    // need to conditionally render the auth component 
    <Router>
      <Switch>
        <Route path={'/'} exact component={Home}></Route>
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
