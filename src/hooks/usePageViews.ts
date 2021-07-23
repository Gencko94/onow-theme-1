import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";
const usePageViews = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.initialize("UA-201768977-1");
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location]);
};

export default usePageViews;
