import Layout from '../layout/Layout';
import '../styles.css';
import Hero from '../components/Home/Hero/Hero';
import Introduction from '../components/Home/Introduction/Introduction';
import MainMenu from '../components/Home/MainMenu/MainMenu';
import styled from 'styled-components';
import HomeCategories from '../components/HomeCategories/HomeCategories';
function Home() {
  return (
    <Layout>
      <Hero />

      <Container>
        <Introduction />
        <MainMenu />
        <HomeCategories />
      </Container>
    </Layout>
  );
}

export default Home;

const Container = styled.div`
  margin-top: 58px;
`;
