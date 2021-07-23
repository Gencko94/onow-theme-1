import ContentLoader from "react-content-loader";
import useResponsive from "../../../hooks/useResponsive";
import Grid from "../../reusables/Grid";
import { FlexWrapper } from "../../reusables/Flex";
import styled from "styled-components";

const BarLoader = () => {
  const { isDesktop } = useResponsive();

  return (
    <div>
      <FlexContainer>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          return (
            <ContentLoader
              key={i}
              style={{ minWidth: "170px" }}
              viewBox={isDesktop ? `0 0 400 90` : `0 0 350 100`}
            >
              <rect
                x="0"
                y="0"
                rx="5"
                ry="5"
                width="100%"
                height={isDesktop ? "90" : "100"}
              />
            </ContentLoader>
          );
        })}
      </FlexContainer>

      <Grid cols="repeat(auto-fit,minmax(250px,1fr))" gap="1.5rem">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          return (
            <ContentLoader
              key={i}
              viewBox={isDesktop ? `0 0 300 250` : `0 0 400 300`}
            >
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
            </ContentLoader>
          );
        })}
      </Grid>
    </div>
  );
};

export default BarLoader;

const FlexContainer = styled(FlexWrapper)`
  overflow-x: hidden;
  gap: 1rem;
  margin: 1rem 0;
`;
