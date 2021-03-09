import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styled from 'styled-components';
import MobileHeader from '../components/Header/MobileHeader';
import Addresses from '../components/MyAccount/Addresses';
import Profile from '../components/MyAccount/Profile';
import Layout from '../layout/Layout';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const { t } = useTranslation(['account']);
  return (
    <Layout>
      <MobileHeader title="my-account" />
      <TabsContainer>
        <Tab
          onClick={() => setActiveTab('profile')}
          active={activeTab === 'profile'}
        >
          <TabTitle>{t('profile')}</TabTitle>
        </Tab>
        <Tab
          onClick={() => setActiveTab('addresses')}
          active={activeTab === 'addresses'}
        >
          <TabTitle>{t('my-addresses')}</TabTitle>
        </Tab>
      </TabsContainer>
      <Container>
        <SwitchTransition mode="out-in">
          {activeTab === 'profile' ? (
            <CSSTransition
              classNames="checkout-component"
              key="delivery"
              timeout={250}
            >
              <Profile />
            </CSSTransition>
          ) : (
            <CSSTransition
              classNames="checkout-component"
              key="pickup"
              timeout={250}
            >
              <Addresses />
            </CSSTransition>
          )}
        </SwitchTransition>
      </Container>
    </Layout>
  );
};

export default MyAccount;

const Container = styled.div`
  padding: 0.5rem;
`;

const TabsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Tab = styled.div<{ active: boolean }>`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.active ? props.theme.highlightColor : props.theme.inputColorDark};
  color: ${props =>
    props.active ? props.theme.highlightColorText : props.theme.headingColor};
`;
const TabTitle = styled.h6`
  font-size: 1.1rem;
  font-weight: ${props => props.theme.font.bold};
`;
