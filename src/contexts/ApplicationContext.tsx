import { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Address } from '../interfaces/Address';
import { Branch } from '../interfaces/branch';
import { Init } from '../interfaces/init';
import { OrderTime, OrderTimeType } from '../interfaces/orderTime';
import { getGeneralInfo } from '../utils/queries';

interface ContextProps extends Init {
  selectedOrderMode: OMode;
  handleOrderModeChange: (mode: OMode) => void;
  handleBranchChange: (branch: Branch) => void;
  branch: Branch | null;
  deliveryAddress: Address | null;
  addUserLocation: (location: Address) => void;
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
  const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);
  const [orderTime, setOrderTime] = useState<OrderTime>(new Date());
  const [orderTimeType, setOrderTimeType] = useState<OrderTimeType>('asap');
  const { data } = useQuery('application-data', getGeneralInfo, {
    suspense: true,
  });

  const handleOrderModeChange = (mode: OMode) => {
    setOrderMode(mode);
  };
  const handleBranchChange = (branch: Branch) => {
    setBranch(branch);
  };
  const addUserLocation = (location: Address) => {
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
        store_theme: data?.store_theme,
        store_images: data?.store_images,
        store_name: data?.store_name,
        payment_methods: data?.payment_methods,
        cart_total: data?.cart_total,
        order_modes: data?.order_modes,
      }}
    >
      {children}
    </ApplicationProvider.Provider>
  );
};

export default ApplicationContext;
