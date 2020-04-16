import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import SlbiEmail from './containers/Email/Email';

import BulkEmail from './containers/Email/BulkEmail/BulkEmail';
import CreateEmail from './containers/Email/CreateEmail/CreateEmail';
import Docs from './components/Docs/Docs';
import NetworkDetector from './hoc/NetworkDetector/NetworkDetector';
// import GroupEmail from './containers/Email/GroupEmail/GroupEmail';

function App() {
  return (
    < BrowserRouter >
      <SlbiEmail />
      <Switch>
        {/* <Route path="/group-email/" component={GroupEmail} /> */}
        <Route path="/bulk-email/" component={BulkEmail} />
        <Route path="/create-email/" component={CreateEmail} />
        <Route path="/" component={Docs} exact />
        <Route path='*' exact={true} render={() => <div className="NotFoundPage"><h1>Not Found</h1></div>} />
      </Switch>
    </ BrowserRouter>
  );
}

export default NetworkDetector(App);
