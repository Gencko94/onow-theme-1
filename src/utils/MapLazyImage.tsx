import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

interface MapProps {
  lat: string;
  lng: string;
  height: string;
  width: string;
  alt: string;
}

const MapLazyImage = ({ lat, lng, height, width, alt }: MapProps) => {
  return (
    <ImageContainer>
      <Image
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=${width}x${height}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        alt={alt}
      />
    </ImageContainer>
  );
};

export default MapLazyImage;

const ImageContainer = styled.div`
  position: relative;
  background-color: #fff;
  /* height: 100%; */
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

// const Image = styled.img`
//   margin: auto;
//   position: absolute;
//   display: block;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: 2;
//   max-height: 100%;
//   max-width: 100%;
// `;
const Image = styled.img`
  z-index: 2;
  /* max-height: 150px; */
  border-radius: 50%;
`;
