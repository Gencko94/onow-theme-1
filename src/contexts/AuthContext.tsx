import { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Address } from '../interfaces/Address';
import { USER } from '../interfaces/init';
import { getUser } from '../utils/queries';

interface AuthContextProps {
  user: USER | undefined;
}

export const AuthProvider = createContext<AuthContextProps>({
  user: undefined,
});

const AuthContext: React.FC = ({ children }) => {
  const t = localStorage.getItem('tpid');
  const { data: user } = useQuery('auth', () => getUser(t), {
    suspense: true,
  });
  return (
    <AuthProvider.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
