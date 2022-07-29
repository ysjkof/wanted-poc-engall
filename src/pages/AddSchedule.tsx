import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryBtn, SecondaryButton } from '../components/Button';
import PageLayout from '../components/PageLayout';
import Selectbox from '../components/Selectbox';
import { Days, DAYS_KOR } from '../constants/constants';
import useScheduls from '../hooks/useSchedules';
import { DayTypes } from '../models/schedulesModel';

export default function AddSchedule() {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState({
    [Days.SUNDAY]: false,
    [Days.MONDAY]: false,
    [Days.TUESDAY]: false,
    [Days.WEDNESDAY]: false,
    [Days.THURSDAY]: false,
    [Days.FRIDAY]: false,
    [Days.SATURDAY]: false,
  });

  const [time, setTime] = useState(() => {
    const time = new Date();
    time.setHours(9, 0, 0, 0);
    return time;
  });

  const { saveSchedules } = useScheduls();

  const toggleDay = (day: DayTypes) =>
    setSelectedDays((prevState) => ({ ...prevState, [day]: !prevState[day] }));

  const filterSelectedDay = () =>
    Object.entries(selectedDays).filter((day) => day[1] && day);

  const invokeSaveSchedule = async (event: FormEvent) => {
    event.preventDefault();

    const filteredSelectedDay = filterSelectedDay();

    if (filteredSelectedDay.length === 0) return;
    const changeArrOfDateObj = filteredSelectedDay
      .map((day) => day[0])
      .map((day) => {
        const result = new Date(time);
        result.setDate(result.getDate() + (+day - result.getDay()));
        return result;
      });

    await saveSchedules(changeArrOfDateObj);
    navigate('/');
  };

  return (
    <PageLayout
      title={'Add class schedule'}
      contents={
        <>
          <Form onSubmit={invokeSaveSchedule}>
            <Row>
              <Column>Start time</Column>
              <Column>
                <Selectbox time={time} setTime={setTime} />
              </Column>
            </Row>
            <Row>
              <Column>
                <span>Repeat on</span>
              </Column>
              <Column>
                {selectedDays &&
                  Object.entries(selectedDays).map(([day, isSelect], idx) => (
                    <SecondaryButton
                      key={idx}
                      type="button"
                      text={DAYS_KOR[+day]}
                      isActivation={isSelect}
                      onClick={() => toggleDay(+day)}
                    />
                  ))}
              </Column>
            </Row>
          </Form>
          <LastRow>
            <SaveButton type="submit" onClick={invokeSaveSchedule}>
              Save
            </SaveButton>
          </LastRow>
        </>
      }
    />
  );
}

const Form = styled.form`
  padding: 1rem;
  background-color: white;
  height: 100%;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 6rem;
`;
const LastRow = styled(Row)`
  justify-content: right;
  padding: 1rem;
`;
const Column = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  :first-child {
    width: 6rem;
    white-space: nowrap;
  }
  align-items: center;
  justify-content: space-between;
`;

const SaveButton = styled(PrimaryBtn)``;
