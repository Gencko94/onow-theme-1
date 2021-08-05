import styled from "styled-components";
import Placeholder from "../reusables/Placeholder";
import { Carousel } from "react-responsive-carousel";
import Zoom from "react-medium-image-zoom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-medium-image-zoom/dist/styles.css";
import { useMemo } from "react";
import { up } from "../../utils/themes";
import { useState } from "react";
interface IProps {
  image?: string;
  gallery?: { id: number; link: string }[];
}

const ProductImage = ({ gallery, image }: IProps) => {
  const [showImages, setShowImages] = useState(false);
  const images = useMemo(() => {
    if (Boolean(image)) {
      return [image, ...gallery?.map((i) => i.link)!];
    }
  }, [gallery, image]);
  const imageStyle = { display: "none" };
  return (
    <Container>
      <Placeholder height="300px" ready={Boolean(showImages)} margin="1rem 0">
        <div className="content">
          <Carousel showStatus={false}>
            {images?.map((image, index) => (
              <Zoom key={index}>
                <img src={image} />
              </Zoom>
            ))}
          </Carousel>
        </div>
      </Placeholder>
      {Boolean(image) && (
        <img
          alt="loading"
          style={imageStyle}
          src={image}
          onLoad={() => {
            setShowImages(true);
          }}
        />
      )}
    </Container>
  );
};

export default ProductImage;
const Container = styled.div(
  ({ theme: { breakpoints } }) => `
align-self: center;
min-height:200px;
  
${up(breakpoints.md)}{
  .content {
    min-height:300px;

  }
}
  `
);
