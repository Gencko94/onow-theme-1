import { createContext, useState } from 'react';
import { Address } from '../interfaces/Address';

interface UserInfoContextProps {
  editedAddress: Address | null;
  handleSetEditedAddress: (address: Address | null) => void;
  handleSetNewAddress: (address: Address) => void;
  newAddress: Address;
}
const address = {
  mapAddress: 'شارع حمد المبارك,قطعة 4,السالمية',
  block: '4',
  building: '',
  area: 'السالمية',
  coords: {
    lat: 29.335375,
    lng: 48.071625,
  },
  street: 'شارع حمد المبارك',
};
export const UserInfoProvider = createContext<UserInfoContextProps>({
  editedAddress: null,
  newAddress: address,
  handleSetEditedAddress: () => {},
  handleSetNewAddress: () => {},
});

const UserInfoContext: React.FC = ({ children }) => {
  const [editedAddress, setEditedAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Address>(address);
  const handleSetEditedAddress = (address: Address | null) => {
    setEditedAddress(address);
  };
  const handleSetNewAddress = (address: Address) => {
    setNewAddress(address);
  };
  return (
    <UserInfoProvider.Provider
      value={{
        editedAddress,
        handleSetEditedAddress,
        newAddress,
        handleSetNewAddress,
      }}
    >
      {children}
    </UserInfoProvider.Provider>
  );
};

export default UserInfoContext;
