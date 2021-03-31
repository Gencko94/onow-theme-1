import { createContext } from 'react';
import { useQuery } from 'react-query';
import { USER } from '../interfaces/auth';
import { getUser } from '../utils/queries';

interface AuthContextProps {
  user: USER | undefined;
  logOut: () => void;
}

export const AuthProvider = createContext<Partial<AuthContextProps>>({
  user: undefined,
});

const AuthContext: React.FC = ({ children }) => {
  const { data: user } = useQuery('auth', getUser, {
    suspense: true,
  });
  const logOut = () => {
    localStorage.removeItem('tpid');
  };
  return (
    <AuthProvider.Provider
      value={{
        user,
        logOut,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
