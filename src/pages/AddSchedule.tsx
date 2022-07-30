import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryBtn, SecondaryButton } from '../components/Button';
import PageLayout from '../components/PageLayout';
import Selectbox from '../components/Selectbox';
import { Days, DAYS_KOR, SCHEDULE_TIME } from '../constants/constants';
import useScheduls from '../hooks/useSchedules';
import { DayTypes, Schedule } from '../models/schedulesModel';
import { getTotalMinute } from '../utils/utils';

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
  const [disableDay, setDisableDay] = useState<number[]>([]);

  const [time, setTime] = useState(() => {
    const time = new Date();
    time.setHours(9, 0, 0, 0);
    return time;
  });

  const { data, saveSchedules } = useScheduls();

  const toggleDay = (day: DayTypes) =>
    setSelectedDays((prevState) => ({ ...prevState, [day]: !prevState[day] }));

  const filterSelectedDay = () =>
    Object.entries(selectedDays).filter((day) => day[1] && day);

  const invokeSaveSchedule = async (event: FormEvent) => {
    event.preventDefault();

    const filteredSelectedDay = filterSelectedDay();

    if (filteredSelectedDay.length === 0) return;
    const extractDay = filteredSelectedDay.map((day) => day[0]);
    const changeArrayFromObj = extractDay.map((day) => {
      const startDate = new Date(time);
      startDate.setDate(startDate.getDate() + (+day - startDate.getDay()));
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + SCHEDULE_TIME);
      return {
        startDate: startDate,
        endDate: endDate,
      };
    });

    await saveSchedules(changeArrayFromObj);
    navigate('/');
  };

  const getSelectedDay = (date: Date, schedules: Schedule[]) => {
    const changedTimeToMinute = getTotalMinute(date);
    const sameTimeSchedule = schedules.filter(
      (schedule) => getTotalMinute(schedule.startDate) === changedTimeToMinute
    );
    return sameTimeSchedule.map((schedule) => schedule.startDate.getDay());
  };

  useEffect(() => {
    setDisableDay(getSelectedDay(time, data));
  }, [time, data]);

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
                      disabled={disableDay.includes(+day)}
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
