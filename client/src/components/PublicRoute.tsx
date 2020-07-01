import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface PublicRouteProps {
  component: Function;
  path: string;
}

const Loading = () => {
  return <div>Loading</div>;
};

const PublicRoute: React.FC<PublicRouteProps> = ({
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
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
