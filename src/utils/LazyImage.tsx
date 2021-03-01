import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

import { ImageProps } from '../interfaces/Image';

const LazyImage = ({ src, pb, alt }: ImageProps) => {
  return (
    <ImageContainer pb={pb}>
      <LazyLoad offset={300} style={{ maxHeight: '100%' }}>
        <Image src={src} alt={alt} />
      </LazyLoad>
    </ImageContainer>
  );
};

export default LazyImage;

const ImageContainer = styled.div`
  position: relative;
  background-color: #fafafa;
  padding-bottom: ${(props: { pb: string }) => props.pb};
  width: 100%;
`;

const Image = styled.img`
  margin: auto;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  max-height: 100%;
  max-width: 100%;
`;
