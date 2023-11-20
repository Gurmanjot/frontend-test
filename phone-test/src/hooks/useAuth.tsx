import { createContext, useContext, useMemo } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { LOGIN } from '../gql/mutations';
import { useMutation } from '@apollo/client';

const AuthContext = createContext({
  login: ({}) => {},
  logout: () => {}
});

export interface AuthPRoviderProps {
  children: React.ReactNode;
}

export const AuthProvider = () => {
  const [loginMutation] = useMutation(LOGIN);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = ({ username, password }: any) => {
    return loginMutation({
      variables: { input: { username, password } },
      onCompleted: ({ login }: any) => {
        const { access_token, refresh_token, user } = login;
        localStorage.setItem('access_token', JSON.stringify(access_token));
        localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
        localStorage.setItem('username', JSON.stringify(user));
      }
    });
  };

  // call this function to sign out logged in user
  const logout = () => {
    window.localStorage.clear();
    navigate('/login', { replace: true });
  };

  const value = useMemo(() => {
    return {
      login,
      logout
    };
  }, []);

  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
