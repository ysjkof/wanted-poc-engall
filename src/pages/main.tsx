import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../components/Button';
import PageLayout from '../components/PageLayout';
import ScheduleBox from '../components/ScheduleBox';
import { DAYS_KOR, TIME_GAP } from '../constants/constants';
import useScheduls from '../hooks/useSchedules';
import { Schedule } from '../models/schedulesModel';

export type Time = Date;

export enum Days {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

interface SchedulesByDay {
  [Days.SUNDAY]: Schedule[];
  [Days.MONDAY]: Schedule[];
  [Days.TUESDAY]: Schedule[];
  [Days.WEDNESDAY]: Schedule[];
  [Days.THURSDAY]: Schedule[];
  [Days.FRIDAY]: Schedule[];
  [Days.SATURDAY]: Schedule[];
}

export default function Main() {
  const [schedules, setSchedules] = useState<SchedulesByDay>();
  const { data, deleteScheduleById } = useScheduls();

  useEffect(() => {
    console.log('data 감지', data);
    if (data) {
      const distributeEachDay = () => {
        const arrangedObj: SchedulesByDay = {
          [Days.SUNDAY]: [],
          [Days.MONDAY]: [],
          [Days.TUESDAY]: [],
          [Days.WEDNESDAY]: [],
          [Days.THURSDAY]: [],
          [Days.FRIDAY]: [],
          [Days.SATURDAY]: [],
        };

        data.forEach((event) => {
          const key = event.startTime.getDay();
          // @ts-ignore
          arrangedObj[key] = [...arrangedObj[key], event];
        });
        return arrangedObj;
      };

      setSchedules(distributeEachDay());
    }
  }, [data]);

  const invokeDelete = (id: number) => {
    deleteScheduleById(id);
  };

  return (
    <PageLayout
      title={'Class schedule'}
      titltLink={
        <Link to={'add'}>
          <PrimaryButton text="Add Class Schedule" type="button" />
        </Link>
      }
      contents={
        <Schedules>
          {schedules &&
            Object.entries(schedules).map(([day, times], idx) => (
              <Column key={idx}>
                <DayOfWeek>{DAYS_KOR[+day]}</DayOfWeek>
                <ScheduleContainer>
                  {times.map((time: Schedule) => {
                    const end = new Date(time.startTime);
                    end.setMinutes(end.getMinutes() + TIME_GAP);
                    return (
                      <ScheduleBox
                        key={time.id}
                        id={time.id}
                        start={time.startTime}
                        end={end}
                        onClick={() => invokeDelete(time.id)}
                      />
                    );
                  })}
                </ScheduleContainer>
              </Column>
            ))}
        </Schedules>
      }
    />
  );
}

const Schedules = styled.div`
  display: flex;
  height: 100%;
  overflow-y: scroll;
`;
const Column = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const DayOfWeek = styled.h2`
  border-bottom: 1px solid gray;
  font-size: 1rem;
  color: #494949;
  width: 100%;
  text-align: center;
`;

const ScheduleContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;
