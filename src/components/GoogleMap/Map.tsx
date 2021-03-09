import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import useCurrentLocation, {
  MapCoordinates,
} from '../../hooks/useCurrentLocation';
import styled from 'styled-components';
import MapSearchbar from './MapSearchbar';
import axios from 'axios';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';

const center = {
  lat: 29.3759,
  lng: 47.9774,
};

const Map = () => {
  const {
    i18n: { language },
    t,
  } = useTranslation(['map']);

  const [marker, setMarker] = useState<MapCoordinates | null>(null);
  const [markerAddress, setMarkerAddress] = useState<string>('');
  const [outOfBorder, setOutOfBorder] = useState<boolean>(false);
  const { getCurrentLocation } = useCurrentLocation();
  const { addUserLocation } = useContext(ApplicationProvider);
  const { mode } = useContext(ThemeContext);
  const libraries = useMemo<Libraries>(() => ['places'], []);

  const history = useHistory();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    language,
  });
  //problem here when changing lng
  const mapOptions: google.maps.MapOptions = useMemo(() => {
    return {
      // styles: mapStyles,
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
  }, [mode]);
  const mapRef = useRef<google.maps.Map<Element>>();
  const onMapLoad = useCallback((map: google.maps.Map<Element>) => {
    mapRef.current = map;

    getCurrentLocation(
      ({ lat, lng }) => {
        panTo({ lat, lng });
      },
      error => {
        console.log(error);
      }
    );
  }, []);

  const panTo = useCallback(({ lat, lng }: { lat: number; lng: number }) => {
    mapRef.current?.panTo({ lat, lng });
    setMarker({ lat, lng });
    // setMarkerInfoWindowDetails(null);
  }, []);

  useEffect(() => {
    if (marker) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=${language}`
        )
        .then(res => {
          console.log(res.data);
          if (res.data.results.length === 0) {
            setMarkerAddress('');
            // setMarkerInfoWindowDetails(null);
            setOutOfBorder(true);
            return;
          }
          if (
            res.data.results[0].address_components.find((address: any) =>
              address.types.includes('country')
            ).short_name !== 'KW' ||
            res.data.results.length === 0
          ) {
            setOutOfBorder(true);
          } else {
            if (outOfBorder === true) {
              setOutOfBorder(false);
            }
          }
          setMarkerAddress(
            `${res.data.results[0].address_components
              .map((address: any) => address.short_name)
              .join(', ')}`
          );
        })
        .catch(err => {});
    } else {
      setMarkerAddress('');
      // setMarkerInfoWindowDetails(null);
    }
  }, [marker]);

  if (!isLoaded) return <div>loading</div>;
  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%',
      }}
      // onCenterChanged={() => {
      //   mapRef.current?.getCenter().lat();
      //   if (mapRef.current) {
      //     setMarker({
      //       lng: mapRef.current?.getCenter().lng(),
      //       lat: mapRef.current?.getCenter().lat(),
      //     });
      //   }
      // }}

      zoom={15}
      center={center}
      options={mapOptions}
      clickableIcons={false}
      onLoad={onMapLoad}
      onClick={e => {
        setMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }}
    >
      <MapSearchbar panTo={panTo} markerAddress={markerAddress} />
      {marker && <Marker position={{ lat: marker?.lat, lng: marker?.lng }} />}
      {outOfBorder && (
        <OutOfBorderContainer>{t('cannot-deliver-here')}</OutOfBorderContainer>
      )}
      <ConfirmationContainer>
        <MapIcon
          onClick={() =>
            getCurrentLocation(
              ({ lat, lng }) => {
                panTo({ lat, lng });
              },
              error => {
                console.log(error);
              }
            )
          }
        >
          <BiCurrentLocation size={30} />
        </MapIcon>
        <ConfirmButton
          outOfBorder={outOfBorder}
          disabled={outOfBorder}
          onClick={() => {
            if (addUserLocation && marker !== null) {
              addUserLocation({
                lat: marker?.lat,
                lng: marker?.lng,
                physicalAddress: markerAddress,
              });
              history.goBack();
            }
          }}
        >
          {t('confirm-location')}
        </ConfirmButton>
      </ConfirmationContainer>
    </GoogleMap>
  );
};

export default Map;

const ConfirmationContainer = styled.div`
  z-index: 50;
  bottom: 30px;
  position: absolute;
  left: 0;
  right: 0;
  max-width: 90%;
  margin: 0 auto;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmButton = styled.button<{ outOfBorder: boolean }>`
  border-radius: 15px;
  font-size: 1.1rem;
  background-color: ${props =>
    props.outOfBorder ? 'gray' : props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  padding: 0.5rem 0.75rem;
  font-weight: ${props => props.theme.font.bold};
  border: 1px solid ${props => props.theme.btnBorder};
  margin: 0 1rem;
`;
const MapIcon = styled.button`
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
  margin: 0 0.5rem;
  padding: 0.5rem;
  top: 52px;
  left: 2%;
  right: 2%;
  background-color: #b72b2b;
  color: #fff;
  width: 94%;
  border-radius: 12px;
  font-size: 0.9rem;
  text-align: center;
`;
