import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import SlbiEmail from './containers/SlbiEmail/SlbiEmail';

import Email from './containers/SlbiEmail/Email/Email';
import CreateEmail from './containers/SlbiEmail/Email/CreateEmail/CreateEmail';
import Docs from './components/Docs/Docs';
import NetworkDetector from './hoc/NetworkDetector/NetworkDetector'

function App() {
  return (
    < BrowserRouter >
      <SlbiEmail />
      <Switch>
        <Route path="/bulk-email/" component={Email} />
        <Route path="/create-email/" component={CreateEmail} />
        <Route path="/" component={Docs} exact />
        <Route exact render={() => <div className="NotFoundPage"><h1>Not Found</h1></div>} />
      </Switch>
    </ BrowserRouter>
  );
}

export default NetworkDetector(App);
