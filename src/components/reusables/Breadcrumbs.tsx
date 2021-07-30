import React from "react";
import { useTranslation } from "react-i18next";
import { BiHomeAlt } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { up } from "../../utils/themes";

interface IProps {
  /**
   * The name of the current component.
   */

  children: { target: string; name: { [key: string]: string } }[];
}

const Breadcrumbs = ({ children }: IProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <Container>
      <div className="links-container">
        <HomeLink to="/">
          <BiHomeAlt size={16} />
          {t("Home")}
        </HomeLink>
        <span className="chevron">
          <FiChevronRight size={16} />
        </span>
        {children.map((child, i) => {
          return (
            <React.Fragment key={i}>
              {i === children.length - 1 ? (
                <p>{child.name[language]}</p>
              ) : (
                <StyledLink to={child.target}>
                  {child.name[language]}
                </StyledLink>
              )}
              {i !== children.length - 1 && (
                <span className="chevron">
                  <FiChevronRight size={16} />
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Container>
  );
};

export default Breadcrumbs;

const Container = styled.nav(
  ({ theme: { breakpoints, font, headingColor, border } }) => `
  
  padding:0 0 0.5rem 0;
  border-bottom:${border};
  .links-container {
      p {
          color:${headingColor};
          font-weight:${font.bold};
      };
    font-size: 0.9rem;
    white-space:nowrap;
    display: flex;
    font-size:0.9rem;
    align-items: center;
    .chevron {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0.75rem;
    }
  };
  ${up(breakpoints.md)}{
    .links-container {
      font-size:0.9rem;
      
    }
  }
  `
);
const StyledLink = styled(Link)`
  display: block;
  color: ${(props) => props.theme.textSecondary};
  transition: color 75ms ease;
  &:hover {
    color: ${(props) => props.theme.mainColor};
  }
`;
const HomeLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
