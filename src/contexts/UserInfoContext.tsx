import { createContext, useState } from 'react';
import { Address } from '../interfaces/Address';

interface UserInfoContextProps {
  editedAddress: Address | null;
  handleSetEditedAddress: (address: Address | null) => void;
}

export const UserInfoProvider = createContext<UserInfoContextProps>({
  editedAddress: null,
  handleSetEditedAddress: () => {},
});

const UserInfoContext: React.FC = ({ children }) => {
  const [editedAddress, setEditedAddress] = useState<Address | null>(null);
  const handleSetEditedAddress = (address: Address | null) => {
    setEditedAddress(address);
  };
  return (
    <UserInfoProvider.Provider
      value={{ editedAddress, handleSetEditedAddress }}
    >
      {children}
    </UserInfoProvider.Provider>
  );
};

export default UserInfoContext;
