import Layout from '../layout/Layout';
import '../styles.css';
import Hero from '../components/Home/Hero/Hero';
import Introduction from '../components/Home/Introduction/Introduction';
import styled from 'styled-components';
import HomeCategories from '../components/HomeCategories/HomeCategories';
import { useContext } from 'react';
import { ApplicationProvider } from '../contexts/ApplicationContext';
import Deals from '../components/deals/Deals';
function Home() {
  const { deals } = useContext(ApplicationProvider);
  return (
    <Layout>
      <Hero />

      <Container>
        <Introduction />
        {deals && <Deals />}
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
