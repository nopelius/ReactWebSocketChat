import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Converse from './components/Converse/Converse'

const App = () => (
    <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/converse" exact component={Converse}/>
    </Router>
);

export default App;