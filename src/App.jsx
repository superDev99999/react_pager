import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import PageNav from './components/PageNav.jsx';
import EmployeesTable from './components/EmployeesTable.jsx';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <HashRouter>
        <div className="main-container">
          <h1>ACME Pager</h1>
          <Switch>
            <Route
              path="/:pageNum"
              render={props => <EmployeesTable {...props} />}
            />
            <Redirect to="/0" />
          </Switch>
          <PageNav />
        </div>
      </HashRouter>
    );
  }
}

export default App;
