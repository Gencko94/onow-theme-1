import { createContext, useCallback, useState } from "react";
import { useQuery } from "react-query";

import { Init } from "../interfaces/init";
import { getGeneralInfo } from "../utils/queries";

export type TOAST_STATUS = {
  open: boolean;
  text: string;
  fn: () => void;
  type: "success" | "error";
};
interface ContextProps extends Init {
  drawerOpen: boolean;
  handleToggleDrawer: () => void;
  productsView: "grid" | "list" | "bar";
  handleToggleProductsView: (mode: "grid" | "list" | "bar") => void;
  toastStatus: TOAST_STATUS;
  setToastStatus: React.Dispatch<React.SetStateAction<TOAST_STATUS>>;
  handleCloseToast: () => void;
  handleCloseAuthModal: () => void;
  authModalStatus: AuthModalStatus;
  setAuthModalStatus: React.Dispatch<React.SetStateAction<AuthModalStatus>>;
  profileModalOpen: boolean;
  handleToggleProfileModal: () => void;
  handleToggleCartModal: () => void;
  cartModalOpen: boolean;
}
export type OMode = "delivery" | "pickup";
export type AuthModalStatus = {
  open: boolean;
  mode: "login" | "register" | "reset";
};
export const ApplicationProvider = createContext<Partial<ContextProps>>({});
const ApplicationContext: React.FC = ({ children }) => {
  const { data } = useQuery("application-data", getGeneralInfo, {
    suspense: true,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [authModalStatus, setAuthModalStatus] = useState<AuthModalStatus>({
    open: false,
    mode: "login",
  });
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [toastStatus, setToastStatus] = useState<TOAST_STATUS>({
    open: false,
    text: "",
    fn: () => {},
    type: "success",
  });

  const [productsView, setProductsView] = useState<"grid" | "list" | "bar">(
    () => {
      return data!.store_theme.product_view;
    }
  );

  const handleCloseToast = useCallback(() => {
    setToastStatus((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  const handleCloseAuthModal = () => {
    setAuthModalStatus((prev) => ({
      open: false,
      mode: prev.mode,
    }));
  };
  const handleToggleProductsView = (mode: "grid" | "list" | "bar") => {
    setProductsView(mode);
  };

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  // const handleSetSelectDeliveryAddress = (
  //   location: SELECT_DELIVERY_ADDRESS
  // ) => {
  //   setSelectDeliveryAddress(location);
  // };
  const handleToggleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };
  const handleToggleCartModal = () => {
    setCartModalOpen(!cartModalOpen);
  };

  return (
    <ApplicationProvider.Provider
      value={{
        store_theme: data?.store_theme,
        store_images: data?.store_images,
        store_name: data?.store_name,
        payment_methods: data?.payment_methods,

        order_modes: data?.order_modes,
        categories: data?.categories,
        deals: data?.deals,
        country: data?.country,
        drawerOpen,
        handleToggleDrawer,
        handleToggleProductsView,
        productsView,
        handleCloseToast,
        setToastStatus,
        toastStatus,
        authModalStatus,
        handleCloseAuthModal,
        setAuthModalStatus,
        handleToggleProfileModal,
        profileModalOpen,
        cartModalOpen,
        handleToggleCartModal,
      }}
    >
      {children}
    </ApplicationProvider.Provider>
  );
};

export default ApplicationContext;
