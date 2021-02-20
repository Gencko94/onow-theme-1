import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Category } from '../../interfaces/categories';
import LazyImage from '../../utils/LazyImage';

interface Props {
  category: Category;
}

const HomeCategory = ({ category }: Props) => {
  return (
    <Container>
      <ImageContainer to={`/categories/${category.slug}`}>
        <LazyImage src={category.image} alt={category.title} pb="100%" />
      </ImageContainer>
      <NameContainer to={`/categories/${category.slug}`}>
        <CategoryName>{category.title}</CategoryName>
      </NameContainer>
    </Container>
  );
};

export default HomeCategory;

const Container = styled.div``;
const ImageContainer = styled(Link)`
  display: block;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;
const NameContainer = styled(Link)`
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #5f7999;
  display: block;
  color: #eee;
  padding: 0.25rem;
  min-height: 48px;
  margin-top: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CategoryName = styled.p`
  text-align: center;
`;
