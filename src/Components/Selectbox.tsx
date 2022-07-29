import { useState } from 'react';
import styled from 'styled-components';
import { makeHours, makeMinutes, trans2Digit } from '../utils/utils';
import { SecondaryBtn } from './Button';

interface SelectProps {
  time: Date;
  setTime: React.Dispatch<React.SetStateAction<Date>>;
}

export default function Selectbox({ time, setTime }: SelectProps) {
  const [hasHourSelector, setHasHourSelector] = useState(false);
  const [hasMinuteSelector, setHasMinuteSelector] = useState(false);

  const openHourSelector = () => {
    setHasHourSelector((prevState) => !prevState);
  };
  const openMinuteSelector = () => {
    setHasMinuteSelector((prevState) => !prevState);
  };

  const selectHour = (hours: number) => {
    setTime((prevTime) => {
      prevTime.setHours(hours);
      return prevTime;
    });
    setHasHourSelector(false);
  };

  const selectMinute = (minute: number) => {
    setTime((prevTime) => {
      prevTime.setMinutes(minute);
      return prevTime;
    });
    setHasMinuteSelector(false);
  };

  const checkAm = (hour: number) => hour < 12;

  return (
    <Container>
      <SelectorContainer>
        <Column>
          <Button
            type="button"
            isActivation={hasHourSelector}
            onClick={openHourSelector}
          >
            {trans2Digit(time.getHours())}
          </Button>
          {hasHourSelector && (
            <Select>
              {makeHours().map((hours, idx) => (
                <Button
                  key={idx}
                  isActivation={hours === time.getHours()}
                  type="button"
                  onClick={() => selectHour(hours)}
                >
                  {trans2Digit(hours)}
                </Button>
              ))}
            </Select>
          )}
        </Column>
        :
        <Column>
          <Button
            type="button"
            isActivation={hasMinuteSelector}
            onClick={openMinuteSelector}
          >
            {trans2Digit(time.getMinutes())}
          </Button>
          {hasMinuteSelector && (
            <Select>
              {makeMinutes().map((minute, idx) => (
                <Button
                  key={idx}
                  isActivation={minute === +time.getMinutes()}
                  type="button"
                  onClick={() => selectMinute(minute)}
                >
                  {trans2Digit(minute)}
                </Button>
              ))}
            </Select>
          )}
        </Column>
      </SelectorContainer>
      <Column>
        <Button type="button" isActivation={checkAm(time.getHours())}>
          AM
        </Button>
        <Button type="button" isActivation={!checkAm(time.getHours())}>
          PM
        </Button>
      </Column>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 1.6rem;
  font-size: 1rem;
  width: fit-content;
  align-items: center;
  span {
    display: block;
    color: gray;
    text-align: left;
  }
`;
const SelectorContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const Column = styled(SelectorContainer)``;

const Select = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  max-height: 7.4rem;
  border: 1px solid gray;
  overflow: scroll;
  button {
    border: none;
    border-bottom: 1px solid lightgray;
  }
`;

const Button = styled(SecondaryBtn)`
  color: ${(props) => (props.isActivation ? 'white' : 'black')};
  background-color: ${(props) => (props.isActivation ? 'gray' : 'white')};
  width: 4rem;
`;
