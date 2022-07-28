import { useState } from "react";
import styled from "styled-components";
import { makeHours, makeMinutes, trans2Digit } from "../utils/utils";
import { SecondaryBtn } from "./Button";

interface SelectProps {
  startTime: [string, string];
  setStartTime: React.Dispatch<React.SetStateAction<[string, string]>>;
}

export default function Selectbox({ startTime, setStartTime }: SelectProps) {
  const [hasHourSelector, setHasHourSelector] = useState(false);
  const [hasMinuteSelector, setHasMinuteSelector] = useState(false);

  const openHourSelector = () => {
    setHasHourSelector((prevState) => !prevState);
  };
  const openMinuteSelector = () => {
    setHasMinuteSelector((prevState) => !prevState);
  };

  const selectHour = (hours: string) => {
    setStartTime((prevTime) => [hours, prevTime[1]]);
    setHasHourSelector(false);
  };
  const selectMinute = (minute: string) => {
    setStartTime((prevTime) => [prevTime[0], minute]);
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
            {startTime[0]}
          </Button>
          {hasHourSelector && (
            <Select>
              {makeHours().map((hours, idx) => (
                <Button
                  key={idx}
                  isActivation={hours === +startTime[0]}
                  type="button"
                  onClick={() => selectHour(trans2Digit(hours))}
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
            {startTime[1]}
          </Button>
          {hasMinuteSelector && (
            <Select>
              {makeMinutes().map((minute, idx) => (
                <Button
                  key={idx}
                  isActivation={minute === +startTime[1]}
                  type="button"
                  onClick={() => selectMinute(trans2Digit(minute))}
                >
                  {trans2Digit(minute)}
                </Button>
              ))}
            </Select>
          )}
        </Column>
      </SelectorContainer>
      <Column>
        <Button type="button" isActivation={checkAm(+startTime[0])}>
          AM
        </Button>
        <Button type="button" isActivation={!checkAm(+startTime[0])}>
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
  color: ${(props) => (props.isActivation ? "white" : "black")};
  background-color: ${(props) => (props.isActivation ? "gray" : "white")};
  width: 4rem;
`;
