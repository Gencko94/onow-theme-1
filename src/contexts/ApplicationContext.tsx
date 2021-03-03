import { createContext, useState } from 'react';
import { Branch } from '../interfaces/branch';
import { OrderTime, OrderTimeType } from '../interfaces/orderTime';
import { UserLocation } from '../interfaces/userLocation';

interface ContextProps {
  selectedOrderMode: OMode;
  handleOrderModeChange: (mode: OMode) => void;
  handleBranchChange: (branch: Branch) => void;
  branch: Branch | null;
  deliveryAddress: UserLocation | null;
  addUserLocation: (location: UserLocation) => void;
  orderTime: OrderTime;
  handleSetOrderTime: (time: OrderTime) => void;
  orderTimeType: OrderTimeType;
  handleSetOrderTimeType: (type: OrderTimeType) => void;
}
export type OMode = 'delivery' | 'pickup';
export const ApplicationProvider = createContext<Partial<ContextProps>>({
  selectedOrderMode: 'delivery',
  orderTime: new Date(),
});

const ApplicationContext: React.FC = ({ children }) => {
  const [selectedOrderMode, setOrderMode] = useState<OMode>('delivery');
  const [branch, setBranch] = useState<Branch | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<UserLocation | null>(
    null
  );
  const [orderTime, setOrderTime] = useState<OrderTime>(new Date());
  const [orderTimeType, setOrderTimeType] = useState<OrderTimeType>('asap');

  const handleOrderModeChange = (mode: OMode) => {
    setOrderMode(mode);
  };
  const handleBranchChange = (branch: Branch) => {
    setBranch(branch);
  };
  const addUserLocation = (location: UserLocation) => {
    setDeliveryAddress(location);
  };
  const handleSetOrderTime = (time: OrderTime) => {
    setOrderTime(time);
  };
  const handleSetOrderTimeType = (type: OrderTimeType) => {
    setOrderTimeType(type);
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
        handleSetOrderTime,
        orderTime,
        handleSetOrderTimeType,
        orderTimeType,
      }}
    >
      {children}
    </ApplicationProvider.Provider>
  );
};

export default ApplicationContext;
