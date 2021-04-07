import styled from 'styled-components';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCheckCircle } from 'react-icons/bs';
import { getBranches } from '../../../utils/queries';
import { useQuery } from 'react-query';
import { ApplicationProvider } from '../../../contexts/ApplicationContext';
import { Branch } from '../../../interfaces/branch';
import { useHistory, useLocation } from 'react-router';

const PickupMode = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation<string>();
  const history = useHistory();
  const { data: branches } = useQuery('branches', getBranches);
  const { handlePickupBranchChange, handleGlobalOrderModeChange } = useContext(
    ApplicationProvider
  );
  const handleSelectPickupBranch = (branch: Branch) => {
    handleGlobalOrderModeChange?.('pickup');
    handlePickupBranchChange?.(branch);
    if (location.state) {
      history.replace(location.state);
    } else {
      history.goBack();
    }
  };
  return (
    <Container>
      <Title>{t('select-pickup-branch')}</Title>
      <BranchesContainer>
        {branches?.map(branch => (
          <BranchItem
            key={branch.id}
            onClick={() => handleSelectPickupBranch(branch)}
          >
            <ImageContainer>
              <MapImage
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${branch.coords?.lat},${branch.coords?.lng}&zoom=15&size=200x200&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
              />
            </ImageContainer>

            <BranchDetails>
              <BranchNameContainer>
                <BranchName>{branch.name[i18n.language]}</BranchName>
                {branch.isMain && (
                  <MainBranchContainer>
                    <MainBranch>{t('main-branch')}</MainBranch>
                    <Icon>
                      <BsCheckCircle size={20} />
                    </Icon>
                  </MainBranchContainer>
                )}
              </BranchNameContainer>
              <Directions>{branch.directions[i18n.language]}</Directions>
            </BranchDetails>
          </BranchItem>
        ))}
      </BranchesContainer>
    </Container>
  );
};

export default PickupMode;
const Container = styled.div``;

const Title = styled.h5(
  ({ theme: { breakpoints } }) => `
    padding:1rem 0;
  @media ${breakpoints.md}{
    
  }
`
);
const ImageContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  height: 100%;
  width: 100%;
  position:relative;
  
  @media ${breakpoints.md}{
    margin-bottom:0;
    
  }
  `
);
const MapImage = styled.img`
  width: 100%;
  height: 100%;
`;
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
  ({ theme: { breakpoints, overlayColor, shadow, btnBorder } }) => `
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  box-shadow: ${shadow};
  background: ${overlayColor};
  border:${btnBorder};
  @media ${breakpoints.md}{
    grid-template-columns: 0.3fr 1fr;
    &:hover{
      box-shadow:0 0 15px 5px rgba(0,0,0,0.1)
    }

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
    @media ${breakpoints.md}{
      font-size: 0.8rem;
    }
`
);
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.green};
`;
const Directions = styled.p(
  ({ theme: { breakpoints, subHeading, font } }) => `
color:${subHeading};
font-size:.9rem;
font-weight:${font.regular};
margin: .25rem 0;
@media ${breakpoints.md}{
font-size:0.9rem;
}
`
);
