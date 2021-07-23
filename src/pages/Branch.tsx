import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { MdDirections } from "react-icons/md";
import Layout from "../layout/Layout";
import { useParams } from "react-router";
import { getBranch } from "../utils/queries";
import { useQuery } from "react-query";
import MobileHeader from "../components/Header/MobileHeader";
import { getDayStringFromNumber } from "../utils/getDayStringFromNumber";
const Branch = () => {
  const { t, i18n } = useTranslation(["branches"]);
  const { id } = useParams<{ id: string }>();
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const { data: branch, isLoading } = useQuery(["branch", id], () =>
    getBranch(id)
  );
  return (
    <Container>
      <ImageContainer>
        <Image
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${branch?.coords.lat},${branch?.coords.lng}&zoom=15&size=400x400&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
          alt={branch?.name[i18n.language]}
        />
      </ImageContainer>
      <ContentContainer>
        <Name>{branch?.name[i18n.language]}</Name>
        {/* <OpenNow isOpen={branch?.openNow}>
            {branch?.openNow ? t('open-now') : t('closed')}
          </OpenNow> */}
        <Address>{branch?.directions[i18n.language]}</Address>
        {/* <BookingButtonContainer>
            <DirectionsButton>
              <MdDirections size={20} />
              <ButtonText>{t('directions')}</ButtonText>
            </DirectionsButton>
          </BookingButtonContainer> */}
      </ContentContainer>
      <OpeningHoursContainer>
        <OpeningHoursTitle>{t("opening-hours")}</OpeningHoursTitle>
        <OpeningHoursGrid>
          {branch?.openingHours.map((h) => (
            <>
              <DaysContainer>
                <Day>{getDayStringFromNumber(h.day, i18n.language)}</Day>
              </DaysContainer>
              <HoursContainer>
                <Hour>{`${h.from} - ${h.to}`}</Hour>
              </HoursContainer>
            </>
          ))}
        </OpeningHoursGrid>
      </OpeningHoursContainer>
    </Container>
  );
};

export default Branch;

const Container = styled.div(
  ({ theme: { breakpoints, overlayColor, btnBorder } }) => `
  padding:   0.5rem;
  display:grid;
  gap:0.5rem;
  grid-template-columns:1fr;
  @media ${breakpoints.md}{
    padding:  1rem 0.75rem;
    grid-template-columns:0.6fr 1fr 0.6fr;
    max-width:960px;
    margin:0 auto;
    gap:0.5rem;
  }
  @media ${breakpoints.lg}{
    max-width:1100px;

  }
  `
);
const ImageContainer = styled.div(
  ({ theme: { breakpoints, overlayColor, btnBorder } }) => `
  max-height:175px;
  border-radius:8px;
  overflow:hidden;
  
  
  @media ${breakpoints.md}{
      max-height:100%;
    }
  `
);
const Image = styled.img`
  max-height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;
const ContentContainer = styled.div(
  ({ theme: { breakpoints, overlayColor, btnBorder } }) => `
  padding: 0.5rem 0;
  @media ${breakpoints.md}{
    
    padding: 0;
  }
  `
);
const Name = styled.h4(
  ({ theme: { breakpoints, headingColor, font } }) => `
  font-size: 1.3rem;
  color: ${headingColor};
  font-weight: ${font.bold};
`
);
const OpenNow = styled.p<{ isOpen?: boolean }>`
  color: ${(props) =>
    props.isOpen ? props.theme.green : props.theme.dangerRed};
  font-weight: ${(props) => props.theme.font.semibold};
`;
const Address = styled.p(
  ({ theme: { breakpoints, subHeading, font } }) => `
color:${subHeading};
font-size:0.9rem;
font-weight:${font.regular};
margin: .25rem 0;
@media ${breakpoints.md}{
font-size:1rem;
}
`
);

const OpeningHoursTitle = styled.h6`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.headingColor};
  margin-bottom: 0.5rem;
  font-weight: ${(props) => props.theme.font.semibold};
`;

const OpeningHoursContainer = styled.div``;
const OpeningHoursGrid = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  background-color: ${(props) => props.theme.overlayColor};
  border: 1px solid #dfdfdf;
  overflow: hidden;
  border-radius: 5px;
`;
const DaysContainer = styled.div`
  border-bottom: 1px solid #dfdfdf;
`;
const Day = styled.p`
  padding: 0.25rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.subHeading};
  /* border-top: 1px solid #dfdfdf; */
  border-right: 1px solid #dfdfdf;
`;
const HoursContainer = styled.div`
  border-bottom: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
`;
const Hour = styled.p`
  padding: 0.25rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.subHeading};
  /* border-top: 1px solid #dfdfdf; */
  border-left: 1px solid #dfdfdf;
`;
const BookingButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 0;
`;
const DirectionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.25rem;
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.btnPrimaryLight};
  padding: 0.5rem;
  border-radius: 20px;
  color: ${(props) => props.theme.btnText};
  font-weight: ${(props) => props.theme.font.semibold};
`;
const ButtonText = styled.span`
  margin: 0 0.25rem;
`;
