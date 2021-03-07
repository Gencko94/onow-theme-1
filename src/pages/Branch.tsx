import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { branches } from '../data/branches';
import Layout from '../layout/Layout';

const Branch = () => {
  const { t } = useTranslation(['branches']);
  const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const branch = branches[0];
  return (
    <Layout>
      <img
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${branch.coordinates.lat},${branch.coordinates.lng}&zoom=15&size=800x250&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        alt={branch.name}
      />

      <ContentContainer>
        <Name>{branch.name}</Name>
        <OpenNow isOpen={branch.openNow}>
          {branch.openNow ? t('open-now') : t('closed')}
        </OpenNow>
      </ContentContainer>
      <ContentContainer>
        <Address>{branch.directions}</Address>
      </ContentContainer>
      <BookingButtonContainer>
        <BookButton>{t('book-here')}</BookButton>
      </BookingButtonContainer>
      <ContentContainer>
        <OpeningHoursTitle>{t('opening-hours')}</OpeningHoursTitle>
        <OpeningHoursContainer>
          <DaysContainer>
            {days.map(day => (
              <Day key={day}>{day}</Day>
            ))}
          </DaysContainer>
          <HoursContainer>
            {days.map(day => (
              <Hour key={day}>{branch.openingHours}</Hour>
            ))}
          </HoursContainer>
        </OpeningHoursContainer>
      </ContentContainer>
    </Layout>
  );
};

export default Branch;

const ContentContainer = styled.div`
  padding: 0.25rem 1rem;
`;
const Name = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.mainColor};
`;
const OpenNow = styled.p`
  color: ${(props: { isOpen: boolean }) => (props.isOpen ? 'green' : 'red')};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;
const Address = styled.p`
  font-size: 0.9rem;
  color: #57423f;
`;

const OpeningHoursTitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.subHeading};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const OpeningHoursContainer = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
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
  padding: 0.25rem 1rem;
`;
const BookButton = styled.button`
  margin: 0 0.25rem;
  background-color: ${props => props.theme.mainColor};
  padding: 0.5rem;
  border-radius: 20px;
  color: #fff;
`;
