import React, { useState } from 'react';
import {
  useLogoutUserMutation,
  useCurrentUserLazyQuery,
} from '../graphql/generated/graphql';
import Toast from '../components/Toast';

interface AuthContextState {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
  me: any;
}

export const AuthContext = React.createContext<AuthContextState>({
  login: () => {},
  isAuth: false,
  logout: () => {},
  me: null,
});

const AuthContextProvider = (props: any) => {
  const [isAuth, setIsAuth] = useState(false);
  const [me, setMe] = useState(null);

  const [login] = useCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data.me) {
        setMe(data.me as any);
        setIsAuth(true);
        Toast('Logged In', 'success');
      } else {
        setMe(null);
        setIsAuth(false);
      }
    },
    onError: () => {
      Toast('Authentication Error', 'error');
    },
  });

  const [logout] = useLogoutUserMutation({
    onCompleted: () => {
      setIsAuth(false);
      setMe(null);
      Toast('Logged out', 'success');
    },
    onError: () => {
      Toast('Authentication Error', 'error');
    },
  });

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, me }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
