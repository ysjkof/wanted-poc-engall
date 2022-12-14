import styled from 'styled-components';
import XIcon from '../assets/XIcon';
import { Time } from '../pages/main';
import { getTime } from '../utils/utils';

interface ScheduleBoxProps {
  startDate: Time;
  endDate: Time;
  onClick: () => void;
}

export default function ScheduleBox({
  startDate,
  endDate,
  onClick,
}: ScheduleBoxProps) {
  return (
    <Container onClick={onClick}>
      <Column>
        <span>{getTime(startDate)} -</span>
        <span>{getTime(endDate)}</span>
      </Column>
      <Column>
        <XIcon />
      </Column>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.4rem 0.2rem;
  border-radius: 8px;
  font-size: 1rem;
  background-color: lightgray;
  width: fit-content;
  span {
    display: block;
    color: gray;
    text-align: left;
  }
`;

const Column = styled.div`
  svg {
    color: white;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    background-color: gray;
  }
`;
