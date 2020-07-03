import React, { useState } from 'react';
import {
  User,
  useLogoutUserMutation,
  useCurrentUserLazyQuery,
} from '../graphql/generated/graphql';
import Toast from '../components/Toast';

interface AuthContextState {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
  me: User | null;
  isLoading: boolean;
}

export const AuthContext = React.createContext<AuthContextState>({
  isAuth: false,
  isLoading: true,
  me: null,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider: React.FC = (props: any) => {
  const [isAuth, setIsAuth] = useState(false);
  const [me, setMe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [login] = useCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data.me) {
        setMe(data.me as any);
        setIsAuth(true);
      } else {
        setMe(null);
        setIsAuth(false);
      }
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      setIsAuth(false);
      setMe(null);
      Toast('Authentication Error', 'error');
    },
  });

  const [logout] = useLogoutUserMutation({
    onCompleted: () => {
      setIsAuth(false);
      setMe(null);
      setIsLoading(false);
      Toast('Logged out', 'success');
    },
    onError: () => {
      window.location.href = '/';
      console.log('logout error');
    },
  });

  return (
    <AuthContext.Provider
      value={{ isAuth, login, logout, me, isLoading: isLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
