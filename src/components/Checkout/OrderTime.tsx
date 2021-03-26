import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';

interface IProps {
  title: string;
}

const OrderTime = ({ title }: IProps) => {
  const { t } = useTranslation(['checkout']);
  const {
    orderTime,
    orderTimeType,
    handleSetOrderTimeType,
    handleSetOrderTime,
  } = useContext(ApplicationProvider);
  return (
    <Container>
      <TimeOptionsContainer>
        <Subtitle>{t(title)} :</Subtitle>

        <RadioContainer>
          <InputContainer>
            <Label htmlFor="pickup">{t('asap')} </Label>
            <RadioInput
              id="pickup"
              type="radio"
              value="asap"
              name="time"
              checked={orderTimeType === 'asap'}
              onChange={() => {
                handleSetOrderTimeType?.('asap');
              }}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="schedule">{t('schedule')} </Label>
            <RadioInput
              id="schedule"
              type="radio"
              value="schedule"
              name="time"
              checked={orderTimeType === 'schedule'}
              onChange={() => {
                handleSetOrderTimeType?.('schedule');
              }}
            />
          </InputContainer>
        </RadioContainer>
      </TimeOptionsContainer>
      {orderTimeType === 'schedule' && (
        <TimeOptionsContainer>
          <Subtitle>{t('date-time')} </Subtitle>
        </TimeOptionsContainer>
      )}
      {/* <Subtitle bold>{orderTimeType === 'asap' ? 'ASAP' : 'Schedule'}</Subtitle> */}
    </Container>
  );
};

export default OrderTime;

const Container = styled.div`
  padding: 0.5rem;
`;

const Subtitle = styled.p<{ bold?: boolean; center?: boolean }>`
  font-size: 1rem;
  font-weight: ${props =>
    props.bold ? props.theme.font.bold : props.theme.font.semibold};
  text-align: ${props => props.center && 'center'};
`;

const TimeOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${props => props.theme.font.bold};
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.label`
  margin: 0 0.25em;
`;
const RadioInput = styled.input`
  margin: 0 0.25em;
`;
