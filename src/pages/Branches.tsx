import styled from "styled-components";
import Layout from "../layout/Layout";
import MapLazyImage from "../utils/MapLazyImage";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MobileHeader from "../components/Header/MobileHeader";
import { BsCheckCircle } from "react-icons/bs";
import ReactPlaceholder from "react-placeholder/lib";
import { useQuery } from "react-query";
import { getBranches } from "../utils/queries";
import { up } from "../utils/themes";

const Branches = () => {
  const { t, i18n } = useTranslation(["branches"]);
  const { data: branches, isLoading } = useQuery("branches", getBranches);
  const { push } = useHistory();
  console.log(branches);
  return (
    <Container>
      <ReactPlaceholder
        type="textRow"
        style={{
          width: "100%",
          height: "27px",
          borderRadius: "6px",
          marginTop: 0,
          margin: "0.8rem 0",
        }}
        color="#E0E0E0"
        showLoadingAnimation
        ready={Boolean(branches)}
      >
        <></>
      </ReactPlaceholder>
      <BranchesContainer>
        {branches?.map((branch) => (
          <BranchItem key={branch.id}>
            <MapLazyImage
              height="200"
              width="200"
              lat={branch.coords?.lat}
              lng={branch.coords?.lng}
              alt={branch.name[i18n.language]}
            />
            <BranchDetails>
              <BranchNameContainer>
                <BranchName>{branch.name[i18n.language]}</BranchName>
                {branch.isMain && (
                  <MainBranchContainer>
                    <MainBranch>{t("main-branch")}</MainBranch>
                    <Icon>
                      <BsCheckCircle size={20} />
                    </Icon>
                  </MainBranchContainer>
                )}
              </BranchNameContainer>
              <Directions>{branch.directions[i18n.language]}</Directions>
              {/* <OpeningHours>{branch.openingHours}</OpeningHours> */}
              <ButtonsContainer>
                <DetailsButton to={`/branch/${branch.id}`}>
                  {t("branch-details")}
                </DetailsButton>
                {/* <OpenNow isOpen={branch.openNow}>
                    {branch.openNow ? t('open-now') : t('closed')}
                  </OpenNow> */}
                {/* <BookButton onClick={() => push('/booking')}>
                    {t('book-here')}
                  </BookButton> */}
              </ButtonsContainer>
            </BranchDetails>
          </BranchItem>
        ))}
      </BranchesContainer>
    </Container>
  );
};

export default Branches;

const Container = styled.div(
  ({ theme: { breakpoints, bodyColor } }) => `
 
  padding: 1rem 0.5rem;
  @media ${breakpoints.md}{
    padding: 1rem 0.75rem;
    max-width:960px;
    margin:0 auto;
  }
  @media ${breakpoints.lg}{
    max-width:1100px;
  }
`
);

const Title = styled.h1(
  ({ theme: { breakpoints, accentColor } }) => `
  font-size: 1.875rem; 
  line-height: 2.25rem;
  text-align: center;
  margin-bottom: 2rem;
  color:${accentColor};
  @media ${breakpoints.xs} {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`
);
const BranchesContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media ${breakpoints.md}{
    grid-template-columns: 1fr 1fr;
   

  }
`
);
const BranchItem = styled.div(
  ({ theme: { breakpoints, overlayColor, btnBorder } }) => `
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: ${overlayColor};
  border:${btnBorder};
  @media ${breakpoints.md}{
    grid-template-columns: 0.3fr 1fr;

  }
`
);
const BranchDetails = styled.div`
  /* padding: 0.5rem; */
`;
const BranchNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BranchName = styled.h6(
  ({ theme: { breakpoints, font, headingColor } }) => `
  color: ${headingColor};
  font-weight: ${font.bold};
  font-size:1.1rem;
  flex:1;
  @media ${breakpoints.md} {
    font-size: 1.1rem;
  }
`
);
const OpeningHours = styled.p`
  color: ${(props) => props.theme.subHeading};
  font-size: 0.9rem;
  font-weight: ${(props) => props.theme.font.semibold};
`;
const OpenNow = styled.p<{ isOpen: boolean }>`
  color: ${(props) =>
    props.isOpen ? props.theme.green : props.theme.dangerRed};
  font-size: 0.9rem;
  /* margin-bottom: 0.5rem; */
  font-weight: ${(props) => props.theme.font.bold};
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  justify-content: space-between;
  /* justify-content: center; */
`;
const DetailsButton = styled(Link)(
  ({
    theme: {
      breakpoints,
      btnPrimaryDark,
      btnBorder,
      highlightColor,
      highlightColorText,
      font,
    },
  }) => `
  display: block;
  font-weight:${font.semibold};
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  color: #fff;
  font-size:0.9rem;
  border: 1px solid ${btnBorder};
  background-color: ${btnPrimaryDark};
  transition: background-color 100ms;
  @media ${breakpoints.md}{
    font-size:0.9rem;
    padding: 0.25rem 0.5rem;
    &:hover {
      background-color: ${highlightColor};
      color:${highlightColorText};
    }
  }
`
);
const BookButton = styled.button`
  /* display: block; */
  margin: 0 0.25rem;
  background-color: ${(props) => props.theme.mainColor};
  padding: 0.5rem;
  border-radius: 20px;
  color: #fff;
`;
const MainBranchContainer = styled.div(
  ({ theme: { breakpoints, btnPrimaryDark } }) => `
  display:flex;
  align-items:center;
  justify-content:center;
`
);
const MainBranch = styled.p(
  ({ theme: { breakpoints, green, font } }) => `
    color:${green};
    margin: 0 .25rem;
    font-size: 0.8rem;
    font-weight:${font.regular};
    ${up(breakpoints.md)}{
      font-size: 0.8rem;
    }
`
);
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.green};
`;
const Directions = styled.p(
  ({ theme: { breakpoints, subHeading, font } }) => `
color:${subHeading};
font-size:.9rem;
font-weight:${font.regular};
margin: .25rem 0;
${up(breakpoints.md)}{
font-size:0.9rem;
}
`
);
