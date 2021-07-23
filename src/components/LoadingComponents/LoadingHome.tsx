import { useContext } from "react";
import ContentLoader from "react-content-loader";
import { ApplicationProvider } from "../../contexts/ApplicationContext";
import useResponsive from "../../hooks/useResponsive";
import BarLoader from "./LoadingHome/BarLoader";
import GridLoader from "./LoadingHome/GridLoader";
import ListLoader from "./LoadingHome/ListLoader";

const LoadingHome = () => {
  const { productsView } = useContext(ApplicationProvider);
  const { isDesktop } = useResponsive();
  return (
    <div>
      {/* Carousel Loader */}
      <ContentLoader viewBox={isDesktop ? `0 0 380 100` : `0 0 400 150`}>
        {/* Only SVG shapes */}
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="150" />
      </ContentLoader>

      {/* Bar Loader */}
      {productsView === "bar" && <BarLoader />}
      {productsView === "list" && <ListLoader />}
      {productsView === "grid" && <GridLoader />}
    </div>
  );
};

export default LoadingHome;
