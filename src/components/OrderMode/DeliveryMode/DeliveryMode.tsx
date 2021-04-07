import styled from 'styled-components';
import DeliveryLocationsList from './DeliveryLocationsList';
import DeliveryTypePicker from '../../../components/OrderMode/DeliveryMode/DeliveryTypePicker/DeliveryTypePicker';
import { useState } from 'react';
import { DELIVERY_LOCATION_LIST } from '../../../interfaces/branch';
import DeliveryLocationMap from './DeliveryLocationMap';
import { useTranslation } from 'react-i18next';
export type DELIVERY_LOCATION_TYPE = 'map' | 'select';

const DeliveryMode = () => {
  const [
    deliveryLocationType,
    setDeliveryLocationType,
  ] = useState<DELIVERY_LOCATION_TYPE>('select');

  const { t } = useTranslation();
  const [option, setOption] = useState<DELIVERY_LOCATION_LIST | null>(null);
  const [area, setArea] = useState<{ name: { [key: string]: string } } | null>(
    null
  );

  return (
    <Container>
      <Title>{t('select-delivery-destination')}</Title>
      <Grid>
        <DeliveryTypePicker
          deliveryLocationType={deliveryLocationType}
          setDeliveryLocationType={setDeliveryLocationType}
        />

        {deliveryLocationType === 'select' && (
          <DeliveryLocationsList
            option={option}
            setArea={setArea}
            area={area}
            setOption={setOption}
          />
        )}
        {deliveryLocationType === 'map' && <DeliveryLocationMap />}
      </Grid>
    </Container>
  );
};

export default DeliveryMode;
const Container = styled.div``;
const Grid = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  @media ${breakpoints.md}{
    gap: 1rem;
    
    grid-template-columns: 0.3fr 1fr;
  }
`
);
const Title = styled.h5(
  ({ theme: { breakpoints } }) => `
    padding:1rem 0;
  @media ${breakpoints.md}{
    
  }
`
);
