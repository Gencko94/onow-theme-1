import { MdLocationOn } from 'react-icons/md';
import styled from 'styled-components';
import AutoSuggest from 'react-autosuggest';
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { useEffect } from 'react';

interface Props {
  panTo: ({ lat, lng }: { lat: number; lng: number }) => void;
  markerAddress: string | null;
}

const MapSearchbar = ({ panTo, markerAddress }: Props) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data, loading },

    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: {
        lat: () => 29.3759,
        lng: () => 47.9774,
        equals: () => false,
        toJSON: () => ({
          lat: 29.3759,
          lng: 47.9774,
        }),
        toString: () => '',
        toUrlValue: () => '',
      },

      radius: 60 * 1000,
    },
    debounce: 250,
  });
  const renderSuggestions: AutoSuggest.RenderSuggestion<google.maps.places.AutocompletePrediction> = (
    data,

    { query, isHighlighted }
  ) => {
    return (
      status === 'OK' && (
        <SuggestionContainer isHighlighted={isHighlighted}>
          <SuggestionTextContainer>
            <Icon>
              <MdLocationOn size={25} />
            </Icon>
            <SuggestionText>{data.description}</SuggestionText>
          </SuggestionTextContainer>
        </SuggestionContainer>
      )
    );
  };

  const handleClick:
    | AutoSuggest.OnSuggestionSelected<google.maps.places.AutocompletePrediction>
    | undefined = async (e, { suggestion }) => {
    try {
      const results = await getGeocode({ address: suggestion.description });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {}
  };
  useEffect(() => {
    if (markerAddress) {
      setValue(markerAddress, false);
    } else {
    }
  }, [markerAddress, setValue]);
  return (
    <Container>
      <AutoSuggest
        inputProps={{
          placeholder: 'Enter an area to Search',
          autoComplete: 'off',

          name: 'search',
          disabled: !ready,
          style: {
            backgroundColor: '#fff',
            width: '100%',
            borderRadius: '8px',
            marginTop: '.5rem',
            marginBottom: '.5rem',
            fontSize: '.9rem',
            padding: '.5rem',
          },

          value: value,
          onChange: (e, { newValue, method }) => {
            if (
              method === 'down' ||
              method === 'up' ||
              method === 'click' ||
              method === 'enter'
            ) {
              setValue(newValue, false);
            } else {
              setValue(newValue);
            }
          },
        }}
        suggestions={data}
        onSuggestionsFetchRequested={value => {
          return null;
        }}
        onSuggestionsClearRequested={() => {
          clearSuggestions();
        }}
        getSuggestionValue={data => {
          return data.description;
        }}
        renderSuggestion={renderSuggestions}
        highlightFirstSuggestion={true}
        onSuggestionSelected={handleClick}
      />
    </Container>
  );
};

export default MapSearchbar;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 96%;
  right: 2%;
  z-index: 5;
`;
const SuggestionContainer = styled.div<{ isHighlighted: boolean }>`
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;

  background-color: ${props =>
    props.isHighlighted ? props.theme.mainColor : '#fff'};
  color: ${props =>
    props.isHighlighted ? props.theme.highlightColor : '#fff'};
`;
const SuggestionTextContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuggestionText = styled.p``;
