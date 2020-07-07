import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LoginPage from './pages/Login';
import { AuthContext } from './contexts/AuthContext';
import ProfilePage from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import MessagePage from './pages/Message';

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.login();
  }, []);

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data === 'SESSION_EXISTS') {
      window.location.reload();
    }
  });

  return (
    <React.Fragment>
      <ToastContainer />
      <Router>
        <Switch>
          <PublicRoute path="/" exact={true} component={LoginPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/message/:username" component={MessagePage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
