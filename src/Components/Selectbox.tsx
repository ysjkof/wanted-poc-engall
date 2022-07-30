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
      return new Date(prevTime);
    });
    setHasHourSelector(false);
  };

  const selectMinute = (minute: number) => {
    setTime((prevTime) => {
      prevTime.setMinutes(minute);
      return new Date(prevTime);
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
                  {idx === 0 && <Arrow />}
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
                  {idx === 0 && <Arrow />}
                </Button>
              ))}
            </Select>
          )}
        </Column>
      </SelectorContainer>
      <Column>
        <ButtonDark type="button" isActivation={checkAm(time.getHours())}>
          AM
        </ButtonDark>
        <ButtonDark type="button" isActivation={!checkAm(time.getHours())}>
          PM
        </ButtonDark>
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
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  button {
    border: none;
    border-bottom: 1px solid lightgray;
  }
`;

const Button = styled(SecondaryBtn)`
  position: relative;
  z-index: 1;
  color: ${(props) => (props.isActivation ? 'white' : 'black')};
  background-color: ${(props) => (props.isActivation ? 'lightgray' : 'white')};
  width: 4rem;
`;
const ButtonDark = styled(Button)`
  background-color: ${(props) => (props.isActivation ? 'gray' : 'white')};
  cursor: default;
`;

const Arrow = styled.div`
  position: absolute;
  right: 0.2rem;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-top: 0.5rem solid gray;
  top: 45%;
`;
