import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { addresses } from '../../data/addresses';
import Address from './Address';

const Addresses = () => {
  const { t } = useTranslation(['account']);
  return (
    <Container>
      <TitleContainer>
        <Title>{t('saved-addresses')}</Title>
        <Button>{t('addbtn')}</Button>
      </TitleContainer>
      <AddressesContainer>
        {addresses.map(address => (
          <Address key={address.id} address={address} />
        ))}
      </AddressesContainer>
    </Container>
  );
};

export default Addresses;
const Container = styled.div``;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.25rem;
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
  margin: 0.5rem 0 1rem 0;
`;
const Button = styled.button`
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  font-weight: ${props => props.theme.font.bold};
`;
