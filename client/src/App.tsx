import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const authContext = useContext(AuthContext);

  let homeComponent = LoginPage;

  useEffect(() => {
    authContext.login();
  }, []);

  if (authContext.isAuth) {
    homeComponent = HomePage;
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/" exact={true} component={homeComponent} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
