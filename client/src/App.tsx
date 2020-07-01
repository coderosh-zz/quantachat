import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route render={() => 'messenger'} />
      </Switch>
    </Router>
  );
}

export default App;
