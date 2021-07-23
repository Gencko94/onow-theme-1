import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import axios from "axios";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BiCurrentLocation } from "react-icons/bi";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/ThemeContext";
import useCurrentLocation, {
  MapCoordinates,
} from "../../../hooks/useCurrentLocation";
import { DELIVERY_ADDRESS } from "../../../interfaces/Address";
import { GoogleMapsResult } from "../../../interfaces/googleMaps";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { ApplicationProvider } from "../../../contexts/ApplicationContext";
import { OrderProvider } from "../../../contexts/OrderContext";

interface ADDRESS_FORM {
  street: string | undefined;
  block: string | undefined;
}

const DeliveryLocationMap = () => {
  const [outOfBorder, setOutOfBorder] = useState(false);
  const [address, setAddress] = useState<Partial<DELIVERY_ADDRESS> | null>(
    null
  );
  const { handleSetDeliveryAddress, handleGlobalOrderModeChange } =
    useContext(OrderProvider);
  const { getCurrentLocation } = useCurrentLocation();
  const { mode } = useContext(ThemeContext);
  const {
    i18n: { language },
    t,
  } = useTranslation(["map"]);

  const history = useHistory();
  const location = useLocation<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ADDRESS_FORM>({});
  const libraries = useMemo<Libraries>(() => ["places"], []);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    language,
  });

  const [marker, setMarker] = useState<MapCoordinates | null>(() => {
    return null;
  });
  const mapOptions: google.maps.MapOptions = useMemo(() => {
    return {
      disableDefaultUI: true,
      zoomControl: false,
      // gestureHandling: 'greedy',

      styles:
        mode === "light"
          ? []
          : [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ],
    };
  }, []);
  const mapRef = useRef<google.maps.Map<Element>>();
  const onMapLoad = useCallback((map: google.maps.Map<Element>) => {
    mapRef.current = map;
  }, []);
  const mapCenter = useMemo(() => {
    return {
      lat: 29.3759,
      lng: 47.9774,
    };
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
      let governorate: string = "";
      let block: string = "";
      let street: string = "";
      let area: string = "";
      const results = res.data.results;
      if (results.length === 0) {
        // setAddress(null);
        setOutOfBorder(true);
        return;
      }
      if (
        results[0].address_components.find((address: any) =>
          address.types.includes("country")
        ).short_name !== "KW" ||
        results.length === 0
      ) {
        setOutOfBorder(true);
      } else {
        if (outOfBorder === true) {
          setOutOfBorder(false);
        }
      }

      results.forEach((result: GoogleMapsResult) => {
        if (result.types.includes("administrative_area_level_1")) {
          if (!governorate) {
            governorate = result.address_components[0].long_name;
          }
        }
        if (
          result.types.includes("route") ||
          result.types.includes("street_address")
        ) {
          if (!street) {
            street = result.address_components[0].long_name;
          }
        }
        if (result.types.includes("neighborhood")) {
          if (!block) {
            block = result.address_components[0].long_name;
          }
        }
        if (
          result.types.includes("sublocality_level_1") ||
          result.types.includes("sublocality") ||
          result.types.includes("locality")
        ) {
          if (!area) {
            area = result.address_components[0].long_name;
          }
        }
      });
      setAddress({
        block,
        area,
        street,
        governorate,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    reset({
      block: address?.block,
      street: address?.street,
    });
  }, [address]);
  const onSubmit = async (data: ADDRESS_FORM) => {
    if (address?.area && marker?.lat && marker?.lng && !outOfBorder) {
      handleGlobalOrderModeChange?.("delivery");
      handleSetDeliveryAddress?.({
        block: data.block,
        street: data.street,
        coords: {
          lat: marker.lat,
          lng: marker.lng,
        },
        area: address.area,
        governorate: address.governorate,
      });
      if (location.state) {
        history.replace(location.state);
      } else {
        history.goBack();
      }
    } else {
      setOutOfBorder(true);
      return;
    }
  };
  if (!isLoaded) return <LoadingContainer>loading</LoadingContainer>;
  return (
    <Container>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        zoom={15}
        center={mapCenter}
        options={mapOptions}
        clickableIcons={false}
        onLoad={onMapLoad}
        onClick={(e) =>
          handleMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        }
      >
        {marker && <Marker position={{ lat: marker?.lat, lng: marker?.lng }} />}
        {outOfBorder && (
          <OutOfBorderContainer>
            {t("cannot-deliver-here")}
          </OutOfBorderContainer>
        )}
        <MapIcon
          onClick={() =>
            getCurrentLocation(
              ({ lat, lng }) => {
                panTo({ lat, lng });
                handleMapClick({ lat, lng });
              },
              (error) => {
                console.log(error);
              }
            )
          }
        >
          <BiCurrentLocation size={30} />
        </MapIcon>
      </GoogleMap>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <GridContainer>
          <div>
            <Label>{t("governorate")}</Label>
            <Input readOnly value={address?.governorate} />
          </div>
          <div>
            <Label>{t("area")}</Label>
            <Input readOnly value={address?.area} />
          </div>
        </GridContainer>
        <GridContainer>
          <div>
            <Label>{t("block")}</Label>
            {/* <Input ref={register} name="block" /> */}

            <ErrorMessage>{errors.block?.message}</ErrorMessage>
          </div>
          <div>
            <Label>{t("street")}</Label>
            {/* <Input name="street" ref={register} /> */}

            <ErrorMessage>{errors.street?.message}</ErrorMessage>
          </div>
        </GridContainer>
        <ConfirmButton type="submit">{t("confirm-location")}</ConfirmButton>
      </FormContainer>
    </Container>
  );
};

export default DeliveryLocationMap;
const Container = styled.div(
  ({ theme: { breakpoints, headingColor } }) => `
  height: 500px;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows:250px 200px;
  gap: 0.5rem;
  @media ${breakpoints.md}{
    
    height: 275px;
    padding: 1rem 0;
    grid-template-columns: 1fr 1fr;
  }
  `
);
const FormContainer = styled.form`
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
`;
const Input = styled.input`
  border-radius: 6px;
  background-color: ${(props) => props.theme.inputColorLight};
  padding: 0.25rem 0.5rem;
  color: ${(props) => props.theme.subHeading};
  width: 100%;
`;
const Label = styled.p`
  font-size: 1rem;
  font-weight: ${(props) => props.theme.font.regular};
  margin-bottom: 0.4rem;
`;
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
  background-color: ${(props) => props.theme.dangerRed};
  padding: 0.25rem;
  border-radius: 50%;
  color: ${(props) => props.theme.btnText};
`;

const OutOfBorderContainer = styled.div`
  position: absolute;
  /* margin: 0 0.5rem; */
  padding: 0.5rem;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);

  background-color: #b72b2b;
  color: #fff;

  border-radius: 12px;
  font-size: 0.9rem;
  text-align: center;
`;
const ConfirmButton = styled.button(
  ({ theme: { breakpoints, btnPrimaryLight, btnText, btnBorder, font } }) => `
  background-color: ${btnPrimaryLight};
  color: ${btnText};
  border-radius: 6px;
  padding: 0.75rem;
  font-size:1.1rem;
  width:100%;
  font-weight:${font.semibold};
  border:${btnBorder};
  @media ${breakpoints.md}{
    font-size:1rem;
    padding: 0.5rem;
    width:auto;
  }
`
);
const ErrorMessage = styled.p`
  color: ${(props) => props.theme.dangerRed};
  font-size: 0.8rem;
  margin-top: 0.25rem;
  height: 19px;
`;
