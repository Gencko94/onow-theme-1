import { useContext, useState } from 'react';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';

import DateTimePicker from '../../utils/DateTimePicker';

interface IProps {
  title: string;
}

const OrderTime = ({ title }: IProps) => {
  const {
    orderTime,
    orderTimeType,
    handleSetOrderTimeType,
    handleSetOrderTime,
  } = useContext(ApplicationProvider);
  return (
    <Container>
      <TimeOptionsContainer>
        <Subtitle>{title} :</Subtitle>

        <RadioContainer>
          <InputContainer>
            <Label htmlFor="pickup">ASAP</Label>
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
            <Label htmlFor="schedule">Schedule</Label>
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
          <Subtitle>Date & Time</Subtitle>
          <DateTimePicker
            selectedDate={orderTime || new Date()}
            handleSetOrderTime={handleSetOrderTime}
          />
        </TimeOptionsContainer>
      )}
      {/* <Subtitle bold>{orderTimeType === 'asap' ? 'ASAP' : 'Schedule'}</Subtitle> */}
    </Container>
  );
};

export default OrderTime;

const Container = styled.div`
  padding: 0.5rem 0;
`;

const Subtitle = styled.p<{ bold?: boolean; center?: boolean }>`
  font-size: 1rem;
  font-weight: ${props => (props.bold ? '600' : '400')};
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
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: 600;
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
