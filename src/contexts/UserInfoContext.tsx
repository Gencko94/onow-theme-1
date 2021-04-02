import { createContext, useState } from 'react';
import { DELIVERY_ADDRESS } from '../interfaces/Address';

interface UserInfoContextProps {
  editedAddress: DELIVERY_ADDRESS | null;
  handleSetEditedAddress: (address: DELIVERY_ADDRESS | null) => void;
  handleSetNewAddress: (address: DELIVERY_ADDRESS) => void;
  newAddress: DELIVERY_ADDRESS;
}
const address = {
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
  const [editedAddress, setEditedAddress] = useState<DELIVERY_ADDRESS | null>(
    null
  );
  const [newAddress, setNewAddress] = useState<DELIVERY_ADDRESS>(address);
  const handleSetEditedAddress = (address: DELIVERY_ADDRESS | null) => {
    setEditedAddress(address);
  };
  const handleSetNewAddress = (address: DELIVERY_ADDRESS) => {
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
