import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import useCurrentLocation, {
  MapCoordinates,
} from '../hooks/useCurrentLocation';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { GoogleMapsResult } from '../interfaces/googleMaps';
import { DELIVERY_ADDRESS } from '../interfaces/Address';
import { UserInfoProvider } from '../contexts/UserInfoContext';

interface IProps {
  outOfBorder: boolean;
  setOutOfBorder: Dispatch<SetStateAction<boolean>>;
}

const EditAddressMap = ({ outOfBorder, setOutOfBorder }: IProps) => {
  const { getCurrentLocation } = useCurrentLocation();
  const { handleSetEditedAddress, editedAddress } = useContext(
    UserInfoProvider
  );
  const { mode } = useContext(ThemeContext);
  const libraries = useMemo<Libraries>(() => ['places'], []);
  const {
    i18n: { language },
    t,
  } = useTranslation(['map']);
  const [address, setAddress] = useState<DELIVERY_ADDRESS | null>(() => {
    return editedAddress;
  });
  const [marker, setMarker] = useState<MapCoordinates | null>(() => {
    if (editedAddress?.coords) {
      return {
        lat: editedAddress.coords.lat,
        lng: editedAddress.coords.lng,
      };
    } else return null;
  });
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    language,
  });

  const mapCenter = useMemo(() => {
    if (editedAddress?.coords) {
      return {
        lat: editedAddress.coords.lat,
        lng: editedAddress.coords.lng,
      };
    } else {
      return {
        lat: 29.3759,
        lng: 47.9774,
      };
    }
  }, []);

  //problem here when changing lng
  const mapOptions: google.maps.MapOptions = useMemo(() => {
    return {
      disableDefaultUI: true,
      zoomControl: false,
      gestureHandling: 'greedy',

      styles:
        mode === 'light'
          ? []
          : [
              { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
              {
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#242f3e' }],
              },
              {
                elementType: 'labels.text.fill',
                stylers: [{ color: '#746855' }],
              },
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }],
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }],
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }],
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }],
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }],
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }],
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }],
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }],
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }],
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }],
              },
              {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }],
              },
              {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }],
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }],
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }],
              },
              {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }],
              },
            ],
    };
  }, []);
  const mapRef = useRef<google.maps.Map<Element>>();
  const onMapLoad = useCallback((map: google.maps.Map<Element>) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }: { lat: number; lng: number }) => {
    mapRef.current?.panTo({ lat, lng });
    setMarker({ lat, lng });
  }, []);

  const handleMapClick = async ({ lat, lng }: { lat: number; lng: number }) => {
    setMarker({
      lat,
      lng,
    });
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=${language}`
      );
      let block: string = '';
      let street: string = '';
      let area: string = '';

      const results = res.data.results;
      if (results.length === 0) {
        setAddress(null);
        setOutOfBorder(true);
        return;
      }
      if (
        results[0].address_components.find((address: any) =>
          address.types.includes('country')
        ).short_name !== 'KW' ||
        results.length === 0
      ) {
        setOutOfBorder(true);
      } else {
        if (outOfBorder === true) {
          setOutOfBorder(false);
        }
      }

      results.forEach((result: GoogleMapsResult) => {
        if (
          result.types.includes('street_address') ||
          result.types.includes('route')
        ) {
          street = result.address_components[0].long_name;
        }
        if (result.types.includes('neighborhood')) {
          block = result.address_components[0].long_name;
        }
        if (
          result.types.includes('sublocality_level_1') ||
          result.types.includes('sublocality') ||
          result.types.includes('locality')
        ) {
          area = result.address_components[0].long_name;
        }
      });
      handleSetEditedAddress({
        ...editedAddress,
        coords: {
          lat,
          lng,
        },
        area,
        block,
        street,
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (!isLoaded) return <LoadingContainer>loading</LoadingContainer>;
  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%',
      }}
      zoom={15}
      center={mapCenter}
      options={mapOptions}
      clickableIcons={false}
      onLoad={onMapLoad}
      onClick={e =>
        handleMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() })
      }
    >
      {marker && <Marker position={{ lat: marker?.lat, lng: marker?.lng }} />}
      {outOfBorder && (
        <OutOfBorderContainer>{t('cannot-deliver-here')}</OutOfBorderContainer>
      )}
      <MapIcon
        onClick={() =>
          getCurrentLocation(
            ({ lat, lng }) => {
              panTo({ lat, lng });
              handleMapClick({ lat, lng });
            },
            error => {
              console.log(error);
            }
          )
        }
      >
        <BiCurrentLocation size={30} />
      </MapIcon>
    </GoogleMap>
  );
};

export default EditAddressMap;

const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapIcon = styled.button`
  position: absolute;
  z-index: 50;
  top: 10px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.dangerRed};
  padding: 0.25rem;
  border-radius: 50%;
  color: ${props => props.theme.btnText};
`;

const OutOfBorderContainer = styled.div`
  position: absolute;
  /* margin: 0 0.5rem; */
  padding: 0.5rem;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  /* left: 2%; */
  /* right: 2%; */
  background-color: #b72b2b;
  color: #fff;
  /* width: 94%; */
  border-radius: 12px;
  font-size: 0.9rem;
  text-align: center;
`;
