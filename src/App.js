import React from 'react';
import Home from "./pages/home/home";
import {Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Sessions from "./pages/sessions/sessions";
import Users from "./pages/users/users";
import Settings from "./pages/settings/settings";
import CreateSession from "./pages/createSession/createSession";
import Menu from "./components/menu/menu";
import history from 'history/browser';

const App = () => {
    return (
        <Router history={history}>
            <Menu/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/sessions' component={Sessions}/>
                <Route exact path='/users' component={Users}/>
                <Route exact path='/settings' component={Settings}/>
                <Route exact path='/create-session' component={CreateSession}/>
            </Switch>
        </Router>

    );
};

export default App;
