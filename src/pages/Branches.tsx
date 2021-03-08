import styled from 'styled-components';
import Hero from '../components/Home/Hero/Hero';
import { branches } from '../data/branches';
import Layout from '../layout/Layout';
import MapLazyImage from '../utils/MapLazyImage';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MobileHeader from '../components/Header/MobileHeader';

const Branches = () => {
  const { t } = useTranslation(['branches']);

  const { push } = useHistory();
  return (
    <Layout>
      <MobileHeader title="our-branches" />
      <Container>
        <BranchesContainer>
          {branches.map(branch => (
            <BranchItem>
              <MapLazyImage
                height="200"
                width="200"
                lat={branch.coordinates?.lat}
                lng={branch.coordinates?.lng}
                alt={branch.name}
              />
              <BranchDetails>
                <BranchName>{branch.name}</BranchName>
                <OpeningHours>{branch.openingHours}</OpeningHours>
                <OpenNow isOpen={branch.openNow}>
                  {branch.openNow ? t('open-now') : t('closed')}
                </OpenNow>
                <ButtonsContainer>
                  <DetailsButton to={`/branch/${branch.name}`}>
                    {t('branch-details')}
                  </DetailsButton>
                  {/* <BookButton onClick={() => push('/booking')}>
                    {t('book-here')}
                  </BookButton> */}
                </ButtonsContainer>
              </BranchDetails>
            </BranchItem>
          ))}
        </BranchesContainer>
      </Container>
    </Layout>
  );
};

export default Branches;

const Container = styled.div`
  /* margin-top: 58px; */
  padding: 0.5rem;
  background-color: ${props => props.theme.bodyColor};
`;

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
const BranchesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;
const BranchItem = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;
  padding: 0.25rem;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.overlayColor};
`;
const BranchDetails = styled.div`
  padding: 0.5rem;
`;
const BranchName = styled.h5`
  color: ${props => props.theme.headingColor};

  font-weight: ${props => props.theme.font.xbold};
`;
const OpeningHours = styled.p`
  color: ${props => props.theme.subHeading};
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.semibold};
`;
const OpenNow = styled.p<{ isOpen: boolean }>`
  color: ${props => (props.isOpen ? 'green' : 'red')};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.font.bold};
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  /* justify-content: center; */
`;
const DetailsButton = styled(Link)`
  display: block;
  padding: 0.5rem;
  border-radius: 20px;
  color: #fff;
  background-color: ${props => props.theme.btnPrimaryDark};
`;
const BookButton = styled.button`
  /* display: block; */
  margin: 0 0.25rem;
  background-color: ${props => props.theme.mainColor};
  padding: 0.5rem;
  border-radius: 20px;
  color: #fff;
`;
