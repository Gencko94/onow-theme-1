import { createContext, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { DELIVERY_ADDRESS } from "../interfaces/Address";
import { Branch } from "../interfaces/branch";
import { OrderTime, OrderTimeType } from "../interfaces/orderTime";
import { getGeneralInfo } from "../utils/queries";
export type TOAST_STATUS = {
  open: boolean;
  text: string;
  fn: () => void;
  type: "success" | "error";
};
interface ContextProps {
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
export type OMode = "delivery" | "pickup";

export const OrderProvider = createContext<Partial<ContextProps>>({
  globalOrderMode: null,
  orderTime: new Date(),
});
const OrderContext: React.FC = ({ children }) => {
  const [globalOrderMode, setGlobalOrderMode] = useState<OMode | null>(null);
  const [pickupBranch, setPickupBranch] = useState<Branch | null>(null);

  // const [
  //   selectDeliveryAddress,
  //   setSelectDeliveryAddress,
  // ] = useState<SELECT_DELIVERY_ADDRESS | null>(null);
  const [deliveryAddress, setDeliveryAddress] =
    useState<DELIVERY_ADDRESS | null>(null);
  const [orderTime, setOrderTime] = useState<OrderTime>(new Date());
  const [orderTimeType, setOrderTimeType] = useState<OrderTimeType>("asap");
  const [productsView, setProductsView] = useState<"grid" | "list" | "bar">(
    "bar"
  );
  const { data } = useQuery("application-data", getGeneralInfo, {
    suspense: true,
  });

  const handleToggleProductsView = (mode: "grid" | "list" | "bar") => {
    setProductsView(mode);
  };
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
    <OrderProvider.Provider
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
      }}
    >
      {children}
    </OrderProvider.Provider>
  );
};

export default OrderContext;
