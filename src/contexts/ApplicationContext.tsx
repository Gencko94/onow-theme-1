import { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import { DELIVERY_ADDRESS } from '../interfaces/Address';
import { Branch } from '../interfaces/branch';
import { Init } from '../interfaces/init';
import { OrderTime, OrderTimeType } from '../interfaces/orderTime';
import { getGeneralInfo } from '../utils/queries';

interface ContextProps extends Init {
  globalOrderMode: OMode | null;
  handleGlobalOrderModeChange: (mode: OMode) => void;
  handlePickupBranchChange: (branch: Branch) => void;
  pickupBranch: Branch | null;
  // selectDeliveryAddress: SELECT_DELIVERY_ADDRESS | null;
  deliveryAddress: DELIVERY_ADDRESS | null;
  handleSetDeliveryAddress: (location: DELIVERY_ADDRESS) => void;
  // handleSetSelectDeliveryAddress: (location: SELECT_DELIVERY_ADDRESS) => void;
  orderTime: OrderTime;
  handleSetOrderTime: (time: OrderTime) => void;
  orderTimeType: OrderTimeType;
  handleSetOrderTimeType: (type: OrderTimeType) => void;
}
export type OMode = 'delivery' | 'pickup';
export const ApplicationProvider = createContext<Partial<ContextProps>>({
  globalOrderMode: null,
  orderTime: new Date(),
});
const ApplicationContext: React.FC = ({ children }) => {
  const [globalOrderMode, setGlobalOrderMode] = useState<OMode | null>(null);
  const [pickupBranch, setPickupBranch] = useState<Branch | null>(null);

  // const [
  //   selectDeliveryAddress,
  //   setSelectDeliveryAddress,
  // ] = useState<SELECT_DELIVERY_ADDRESS | null>(null);
  const [
    deliveryAddress,
    setDeliveryAddress,
  ] = useState<DELIVERY_ADDRESS | null>(null);
  const [orderTime, setOrderTime] = useState<OrderTime>(new Date());
  const [orderTimeType, setOrderTimeType] = useState<OrderTimeType>('asap');
  const { data } = useQuery('application-data', getGeneralInfo, {
    suspense: true,
  });

  const handleGlobalOrderModeChange = (mode: OMode) => {
    setGlobalOrderMode(mode);
  };
  const handlePickupBranchChange = (branch: Branch) => {
    setPickupBranch(branch);
  };
  const handleSetDeliveryAddress = (location: DELIVERY_ADDRESS) => {
    setDeliveryAddress(location);
  };
  // const handleSetSelectDeliveryAddress = (
  //   location: SELECT_DELIVERY_ADDRESS
  // ) => {
  //   setSelectDeliveryAddress(location);
  // };
  const handleSetOrderTime = (time: OrderTime) => {
    setOrderTime(time);
  };
  const handleSetOrderTimeType = (type: OrderTimeType) => {
    setOrderTimeType(type);
  };

  return (
    <ApplicationProvider.Provider
      value={{
        globalOrderMode,
        handleGlobalOrderModeChange,
        pickupBranch,
        handlePickupBranchChange,
        deliveryAddress,
        handleSetDeliveryAddress,
        // selectDeliveryAddress,
        // handleSetSelectDeliveryAddress,
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
        categories: data?.categories,
        deals: data?.deals,
      }}
    >
      {children}
    </ApplicationProvider.Provider>
  );
};

export default ApplicationContext;
