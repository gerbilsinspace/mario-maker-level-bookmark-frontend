import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Create from './Create';
import Details from './Details';
import Delete from './Delete';
import Edit from './Edit';
import List from './List';

import Header from './Header';

const App = () => (
  <Router>
    <Header />
    <Switch>
    <Route path="/" exact component={List} />
    <Route path="/create" component={Create} />
    <Route path="/:id" exact component={Details} />
    <Route path="/:id/edit" component={Edit} />
    <Route path="/:id/delete" component={Delete} />
    </Switch>
  </Router>
);

export default App;
