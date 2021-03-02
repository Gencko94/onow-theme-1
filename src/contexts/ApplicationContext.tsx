import { createContext, useState } from 'react';
import { Branch } from '../interfaces/branch';
import { UserLocation } from '../interfaces/userLocation';

interface ContextProps {
  selectedOrderMode: OMode;
  handleOrderModeChange: (mode: OMode) => void;
  handleBranchChange: (branch: Branch) => void;
  branch: Branch | null;
  deliveryAddress: UserLocation | null;
  addUserLocation: (location: UserLocation) => void;
}
export type OMode = 'delivery' | 'pickup';
export const ApplicationProvider = createContext<Partial<ContextProps>>({
  selectedOrderMode: 'delivery',
});

const ApplicationContext: React.FC = ({ children }) => {
  const [selectedOrderMode, setOrderMode] = useState<OMode>('delivery');
  const [branch, setBranch] = useState<Branch | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<UserLocation | null>(
    null
  );

  const handleOrderModeChange = (mode: OMode) => {
    setOrderMode(mode);
  };
  const handleBranchChange = (branch: Branch) => {
    setBranch(branch);
  };
  const addUserLocation = (location: UserLocation) => {
    setDeliveryAddress(location);
  };
  return (
    <ApplicationProvider.Provider
      value={{
        selectedOrderMode,
        handleOrderModeChange,
        branch,
        handleBranchChange,
        addUserLocation,
        deliveryAddress,
      }}
    >
      {children}
    </ApplicationProvider.Provider>
  );
};

export default ApplicationContext;
