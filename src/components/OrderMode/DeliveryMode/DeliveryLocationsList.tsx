import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { getDeliveryLocationList } from '../../../utils/queries';
import Select, { GroupTypeBase, Styles } from 'react-select';
import { DELIVERY_LOCATION_LIST } from '../../../interfaces/branch';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { ApplicationProvider } from '../../../contexts/ApplicationContext';

interface IProps {
  option: DELIVERY_LOCATION_LIST | null;
  setOption: Dispatch<SetStateAction<DELIVERY_LOCATION_LIST | null>>;
  area: { name: { [key: string]: string } } | null;
  setArea: Dispatch<SetStateAction<{ name: { [key: string]: string } } | null>>;
}

const DeliveryLocationsList = ({
  area,
  option,
  setArea,
  setOption,
}: IProps) => {
  const { i18n, t } = useTranslation();

  const { data, isLoading } = useQuery('test', getDeliveryLocationList);
  const {
    globalOrderMode,
    handleGlobalOrderModeChange,
    deliveryAddress,
    handleSetDeliveryAddress,
  } = useContext(ApplicationProvider);
  const customStyles = useMemo<
    | Partial<
        Styles<
          DELIVERY_LOCATION_LIST,
          false,
          GroupTypeBase<DELIVERY_LOCATION_LIST>
        >
      >
    | undefined
  >(
    () => ({
      menuList: (provided, state) => {
        return { ...provided };
      },
    }),
    []
  );
  useEffect(() => {
    if (data) {
      setOption(data[0]);
      setArea(data[0].areas[0]);
    }
  }, [data]);
  const handleSetOrderMode = () => {
    if (!area || !option) {
      return;
    } else {
      handleGlobalOrderModeChange?.('delivery');
      handleSetDeliveryAddress?.({
        area: area.name.en,
        street: '',
        block: '',
        coords: {
          lat: 0,
          lng: 0,
        },
        additionalDirections: '',
        building: '',
        floor: '',
      });
    }
  };

  return (
    <Container>
      <SelectInputsContainer>
        <SelectInputContainer>
          <Label>{t('select-gov')}</Label>

          <Select
            styles={customStyles}
            value={option}
            onChange={value => {
              setOption(value);
              if (value) {
                setArea(value.areas[0]);
              }
            }}
            loadingMessage={() => 'Loading'}
            isLoading={isLoading}
            options={data}
            getOptionLabel={zone => zone.province.name[i18n.language]}
            getOptionValue={zone => zone.province.name[i18n.language]}
          />
        </SelectInputContainer>
        <SelectInputContainer>
          <Label>{t('select-area')} </Label>
          <Select
            options={option?.areas}
            isLoading={isLoading}
            value={area}
            onChange={value => {
              setArea(value);
            }}
            getOptionLabel={option => option.name[i18n.language]}
            getOptionValue={option => option.name[i18n.language]}
          />
        </SelectInputContainer>
      </SelectInputsContainer>
      <ConfirmContainer>
        <ConfirmButton onClick={() => handleSetOrderMode()}>
          Confirm
        </ConfirmButton>
      </ConfirmContainer>
    </Container>
  );
};

export default DeliveryLocationsList;

const Container = styled.div`
  padding: 1rem 0;
`;
const SearchBarContainer = styled.div``;
const SearchBar = styled.input`
  background-color: ${props => props.theme.inputColorLight};
  width: 100%;
  border-radius: 5px;
  padding: 0.5rem;
`;
const SelectInputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;
const SelectInputContainer = styled.div``;
const Label = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;
const ConfirmContainer = styled.div(
  ({ theme: { breakpoints, headingColor } }) => `
  margin-top:1rem;
  display:flex;
  align-items:center;
    @media ${breakpoints.md}{
      justify-content:flex-end;
    }
  `
);
const ConfirmButton = styled.button`
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  border-radius: 6px;
  padding: 0.5rem;
`;
