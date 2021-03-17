import { useContext, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import MobileHeader from '../components/Header/MobileHeader';
import Address from '../components/MyAccount/Address';
import { UserInfoProvider } from '../contexts/UserInfoContext';
import { addresses } from '../data/addresses';
import Layout from '../layout/Layout';
import { getAddresses } from '../utils/queries';

const MyAddresses = () => {
  const { t } = useTranslation(['addresses']);
  const { data, isLoading } = useQuery('addresses', getAddresses);
  const { handleSetNewAddress, handleSetEditedAddress } = useContext(
    UserInfoProvider
  );
  const history = useHistory();
  useEffect(() => {
    handleSetEditedAddress(null);
    handleSetNewAddress({
      mapAddress: 'شارع حمد المبارك,قطعة 4,السالمية',
      block: '4',
      building: '',
      area: 'السالمية',
      coords: {
        lat: 29.335375,
        lng: 48.071625,
      },
      street: 'شارع حمد المبارك',
    });
  }, []);
  return (
    <Layout>
      <Container>
        <MobileHeader title="my-addresses" />
        <TitleContainer>
          <Title>{t('saved-addresses')}</Title>
          <Button onClick={() => history.push('/address/add')}>
            {t('addbtn')}
          </Button>
        </TitleContainer>
        {isLoading && (
          <LoadingGrid>
            {[0, 1, 2].map(() => (
              <ContentLoader
                speed={2}
                width="100%"
                height="126px"
                viewBox="0 0 400 126"
                backgroundColor="#5B5B5B"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="6" ry="6" width="100%" height="100%" />
              </ContentLoader>
            ))}
          </LoadingGrid>
        )}
        {data && (
          <AddressesContainer>
            {data.map(address => (
              <Address key={address.id} address={address} />
            ))}
          </AddressesContainer>
        )}
      </Container>
    </Layout>
  );
};

export default MyAddresses;
const Container = styled.div`
  overflow: hidden;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
`;
const Title = styled.h5(
  ({ theme: { breakpoints, font, headingColor } }) => `
  
  font-weight:${font.bold};
  text-align: center;
 
 
  @media ${breakpoints.xs} {
     
    }
  }
`
);
const AddressesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0.5rem;
`;
const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0.5rem;
`;
const Button = styled.button`
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  font-weight: ${props => props.theme.font.bold};
  border: 1px solid ${props => props.theme.btnBorder};
`;
