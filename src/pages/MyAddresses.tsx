import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder/lib';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import MobileHeader from '../components/Header/MobileHeader';
import Address from '../components/MyAccount/Address';
import { UserInfoProvider } from '../contexts/UserInfoContext';
import Layout from '../layout/Layout';
import { getAddresses } from '../utils/queries';
import { AiOutlinePlus } from 'react-icons/ai';

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
      <MobileHeader title="my-addresses" />
      <Container>
        {isLoading && (
          <AddressesContainer>
            {[0, 1, 2].map(i => (
              <ReactPlaceholder
                key={i}
                type="textRow"
                style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '6px',
                  margin: '0',
                }}
                color="#E0E0E0"
                showLoadingAnimation
                ready={Boolean(data)}
              >
                <></>
              </ReactPlaceholder>
            ))}
          </AddressesContainer>
        )}
        {data && data.length > 0 && (
          <AddressesContainer>
            {data.map(address => (
              <Address key={address.id} address={address} />
            ))}
            <AddNewAddress onClick={() => history.push('/address/add')}>
              <AiOutlinePlus size={25} /> {t('addbtn')}
            </AddNewAddress>
          </AddressesContainer>
        )}
        {data && data.length === 0 && (
          <NoAddressesContainer>
            <Title>{t('no-addresses')}</Title>
            <Button onClick={() => history.push('/address/add')}>
              <AiOutlinePlus size={25} />
              {t('addbtn')}
            </Button>
          </NoAddressesContainer>
        )}
      </Container>
    </Layout>
  );
};

export default MyAddresses;
const Container = styled.div(
  ({ theme: { breakpoints } }) => `
  overflow: hidden;
  margin:0 auto;
  @media ${breakpoints.md}{
    
    max-width:960px;
  }
  @media ${breakpoints.lg}{
    
    max-width:1100px;
  }
  `
);

const Title = styled.h5(
  ({ theme: { breakpoints, font, headingColor } }) => `
  color:${headingColor};
  font-weight:${font.bold};
  text-align: center;
 margin-bottom:1rem;
 
  @media ${breakpoints.xs} {
     
    }
  }
`
);
const AddressesContainer = styled.div(
  ({ theme: { breakpoints, font, headingColor } }) => `
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0.5rem;
  @media ${breakpoints.md}{
    grid-template-columns: 1fr 1fr;

  }
`
);

const Button = styled.button`
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  font-weight: ${props => props.theme.font.bold};
  border: 1px solid ${props => props.theme.btnBorder};
`;
const NoAddressesContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  height:calc(100vh - 229px);
  @media ${breakpoints.md}{
    height:calc(100vh - 230px);
  }
  `
);
const AddNewAddress = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 12px;
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.btnBorder};
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
`;
