import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TweenLite, TimelineLite } from 'gsap';
import styled from 'styled-components';
import { ApplicationProvider } from '../../../contexts/ApplicationContext';
import { useTranslation } from 'react-i18next';

const Introduction = () => {
  const tl = useMemo(() => new TimelineLite({ repeat: -1 }), []);
  const { i18n } = useTranslation();
  const categories = ['Steaks', 'Fries', 'Burgers', 'Doughnuts'];
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const textList = useCallback((el: HTMLDivElement) => {
    if (el) {
      setNode(el);
    }
  }, []);
  const { store_name } = useContext(ApplicationProvider);
  useEffect(() => {
    if (node) {
      node.childNodes.forEach(child => {
        const tween = TweenLite.to(child, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          // ease: Power3.,
        });
        const tween2 = TweenLite.to(child, {
          opacity: 0,
          y: -10,
          duration: 0.6,
          // ease: Power3.easeInOut,
        });
        tl.add(tween).add(tween2);
      });
    }
  }, [node, tl]);

  return (
    <Container>
      <Title>{store_name?.[i18n.language]}</Title>
      <Quote>Try Once , Repeat Forever</Quote>
      <AnimationContainer>
        <h1>Best</h1>
        <ListContainer ref={textList}>
          {categories.map((text, i) => (
            <ListItem key={i}>{text}</ListItem>
          ))}
        </ListContainer>
      </AnimationContainer>
    </Container>
  );
};

export default Introduction;
const Container = styled.div`
  min-height: 100%;
  padding: 0.75rem 0.4rem;
  text-align: center;
`;
const Title = styled.h1`
  font-size: 1.975rem;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.headingColor};
  font-weight: ${props => props.theme.font.xbold};
`;
const Quote = styled.q`
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  display: block;
  margin-bottom: 0.75rem; /* 12px */
  color: ${props => props.theme.subHeading};
  font-weight: ${props => props.theme.font.bold};
`;

const AnimationContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 70%;
  margin: 0 auto;
  position: relative;

  h1 {
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
    margin-left: -80px;
    font-weight:normal;
    @media ${breakpoints.xs} {
      font-size: 1.5rem /* 24px */;
      line-height: 2rem /* 32px */;
    }
  }
`
);
const ListContainer = styled.div`
  padding-bottom: 32px;
  position: relative;
  margin-left: 8px;
`;

const ListItem = styled.span(
  ({ theme: { breakpoints, subHeading, font } }) => `
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
  color : ${subHeading};
  transform: translateY(10px);
  font-weight: ${font.xbold}; 
  font-size: 1.875rem;
  line-height: 2.25rem;

  @media ${breakpoints.xs} {
    font-size: 1.5rem /* 24px */;
    line-height: 2rem /* 32px */;
  }
`
);
