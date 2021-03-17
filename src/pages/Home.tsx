import Layout from '../layout/Layout';
import '../styles.css';
import Hero from '../components/Home/Hero/Hero';
import Introduction from '../components/Home/Introduction/Introduction';
import OrderMode from '../components/Home/OrderMode/OrderMode';
import styled from 'styled-components';
import HomeCategories from '../components/HomeCategories/HomeCategories';
function Home() {
  return (
    <Layout>
      <Hero />

      <Container>
        <Introduction />
        <OrderMode />
        <HomeCategories />
      </Container>
    </Layout>
  );
}

export default Home;

const Container = styled.div`
  margin-top: 58px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`;
