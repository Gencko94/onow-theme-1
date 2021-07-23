import styled from "styled-components";
import Placeholder from "../reusables/Placeholder";
import { Carousel } from "react-responsive-carousel";
import Zoom from "react-medium-image-zoom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-medium-image-zoom/dist/styles.css";
interface IProps {
  image: string;
  gallery: string[];
}

const ProductImage = ({ gallery, image }: IProps) => {
  return (
    <Container>
      <Placeholder height="40px" ready={Boolean(image)} margin="1rem 0">
        <Carousel showStatus={false}>
          {gallery.map((link) => (
            <Zoom>
              <img src={link} />
            </Zoom>
          ))}
        </Carousel>
      </Placeholder>
    </Container>
  );
};

export default ProductImage;
const Container = styled.div``;
