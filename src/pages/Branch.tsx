import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { MdDirections } from 'react-icons/md';
import Layout from '../layout/Layout';
import { useParams } from 'react-router';
import { getBranch } from '../utils/queries';
import { useQuery } from 'react-query';
import MobileHeader from '../components/Header/MobileHeader';

const Branch = () => {
  const { t, i18n } = useTranslation(['branches']);
  const { id } = useParams<{ id: string }>();
  const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const { data: branch, isLoading } = useQuery(['branch', id], () =>
    getBranch(id)
  );
  return (
    <Layout>
      <MobileHeader title="our-branches" />
      <Container>
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${branch?.coords.lat},${branch?.coords.lng}&zoom=15&size=400x400&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
          alt={branch?.name[i18n.language]}
        />
        <ContentContainer>
          <Name>{branch?.name[i18n.language]}</Name>
          <OpenNow isOpen={branch?.openNow}>
            {branch?.openNow ? t('open-now') : t('closed')}
          </OpenNow>
          <Address>{branch?.directions[i18n.language]}</Address>
          <BookingButtonContainer>
            <DirectionsButton>
              <MdDirections size={20} />
              <ButtonText>{t('directions')}</ButtonText>
            </DirectionsButton>
          </BookingButtonContainer>
        </ContentContainer>
        <OpeningHoursContainer>
          <OpeningHoursTitle>{t('opening-hours')}</OpeningHoursTitle>
          <OpeningHoursGrid>
            <DaysContainer>
              {days.map(day => (
                <Day key={day}>{day}</Day>
              ))}
            </DaysContainer>
            <HoursContainer>
              {days.map(day => (
                <Hour key={day}>{branch?.openingHours}</Hour>
              ))}
            </HoursContainer>
          </OpeningHoursGrid>
        </OpeningHoursContainer>
      </Container>
    </Layout>
  );
};

export default Branch;

const Container = styled.div(
  ({ theme: { breakpoints, overlayColor, btnBorder } }) => `
  padding:  1rem 0.25rem;
  display:grid;
  gap:0.5rem;
  grid-template-columns:1fr;
  @media ${breakpoints.md}{
    grid-template-columns:0.6fr 1fr 0.6fr;
    max-width:960px;
    margin:0 auto;
    gap:1rem;
  }
  @media ${breakpoints.lg}{
    max-width:1100px;

  }
  `
);
const ContentContainer = styled.div(
  ({ theme: { breakpoints, overlayColor, btnBorder } }) => `
  // padding: 0.25rem 1rem;
  // display:grid;
  // grid-template-columns:1fr;
  // @media ${breakpoints.md}{

  // }
  `
);
const Name = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.headingColor};
  font-weight: ${props => props.theme.font.xbold};
`;
const OpenNow = styled.p<{ isOpen?: boolean }>`
  color: ${props => (props.isOpen ? props.theme.green : 'red')};
  font-weight: ${props => props.theme.font.bold};
`;
const Address = styled.p`
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.subHeading};
`;

const OpeningHoursTitle = styled.h6`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.subHeading};
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.font.bold};
`;

const OpeningHoursContainer = styled.div``;
const OpeningHoursGrid = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  background-color: ${props => props.theme.overlayColor};
`;
const DaysContainer = styled.div`
  border-bottom: 1px solid #dfdfdf;
`;
const Day = styled.p`
  padding: 0.25rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.subHeading};
  border-top: 1px solid #dfdfdf;
  border-left: 1px solid #dfdfdf;
`;
const HoursContainer = styled.div`
  border-bottom: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
`;
const Hour = styled.p`
  padding: 0.25rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.subHeading};
  border-top: 1px solid #dfdfdf;
  border-left: 1px solid #dfdfdf;
`;
const BookingButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
`;
const DirectionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.25rem;
  background-color: ${props => props.theme.btnPrimaryLight};
  padding: 0.5rem;
  border-radius: 20px;
  color: ${props => props.theme.btnText};
  font-weight: ${props => props.theme.font.semibold};
`;
const ButtonText = styled.span`
  margin: 0 0.25rem;
`;
