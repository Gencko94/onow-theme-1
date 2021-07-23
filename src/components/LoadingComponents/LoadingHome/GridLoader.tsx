import ContentLoader from "react-content-loader";
import useResponsive from "../../../hooks/useResponsive";
import Grid from "../../reusables/Grid";
import { FlexWrapper } from "../../reusables/Flex";
import styled from "styled-components";
import React from "react";

const GridLoader = () => {
  const { isDesktop } = useResponsive();

  return (
    <div>
      {[0, 1].map((i) => {
        return (
          <div style={{ margin: "4rem 0" }} key={i}>
            <ContentLoader
              style={{ margin: "2rem 0" }}
              viewBox={isDesktop ? `0 0 300 10` : `0 0 350 30`}
            >
              <rect
                x="0"
                y="0"
                rx="0"
                ry="0"
                width={isDesktop ? "50" : "70"}
                height={isDesktop ? "10" : "30"}
              />
            </ContentLoader>

            <Grid
              cols="repeat(auto-fit,minmax(250px,1fr))"
              gap="2rem"
              margin="2rem 0"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                return (
                  <ContentLoader
                    key={i}
                    viewBox={isDesktop ? `0 0 300 250` : `0 0 400 300`}
                  >
                    <rect x="0" y="0" rx="5" ry="5" width="100%" height="350" />
                  </ContentLoader>
                );
              })}
            </Grid>
          </div>
        );
      })}
    </div>
  );
};

export default GridLoader;

const FlexContainer = styled(FlexWrapper)`
  overflow-x: hidden;
  gap: 1rem;
  margin: 1rem 0;
`;
