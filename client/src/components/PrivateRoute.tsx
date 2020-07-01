import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface PrivateRouteProps {
  component: Function;
  path: string;
}

const Loading = () => {
  return <div>Loading</div>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuth, isLoading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      component={(props: any) =>
        isLoading ? (
          <Loading />
        ) : isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
