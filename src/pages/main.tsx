import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PrimaryButton } from "../Components/Button";
import Schedule from "../Components/Schedule";
import Title from "../Components/Title";

export type DaysType =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
export type Time = string;
// "00:00" ~ "23:55"

interface Schedules {
  monday: Time[];
  tuesday: Time[];
  wednesday: Time[];
  thursday: Time[];
  friday: Time[];
  saturday: Time[];
  sunday: Time[];
}

interface Event {
  startTime: Time;
  day: DaysType;
}

const events: Event[] = [
  { startTime: "09:30", day: "friday" },
  { startTime: "09:00", day: "wednesday" },
  { startTime: "11:50", day: "monday" },
  { startTime: "14:15", day: "monday" },
  { startTime: "10:00", day: "friday" },
  { startTime: "09:30", day: "sunday" },
];

export default function Main() {
  const [schedules, setSchedules] = useState<Schedules>();

  useEffect(() => {
    const distributeEachDay = () => {
      const arrangedObj: Schedules = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };

      events.forEach((event) => {
        arrangedObj[event.day] = [...arrangedObj[event.day], event.startTime];
      });
      return arrangedObj;
    };

    setSchedules(distributeEachDay());
  }, []);

  return (
    <Contents>
      <Header>
        <Title text="Class schedule" />
        <Link to={"add"}>
          <PrimaryButton text="Add Class Schedule" type="button" />
        </Link>
      </Header>
      <Body>
        <Schedules>
          {schedules &&
            Object.entries(schedules).map(([day, times], idx) => (
              <Column key={idx}>
                <DayOfWeek>{day}</DayOfWeek>
                <ScheduleContainer>
                  {times.map((time: string, idx: number) => (
                    <Schedule key={idx} start={time} end={time} />
                  ))}
                </ScheduleContainer>
              </Column>
            ))}
        </Schedules>
      </Body>
    </Contents>
  );
}

const Contents = styled.div`
  padding: 0 2rem;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0rem;
`;
const Body = styled.div`
  padding: 1rem;
  background-color: white;
  max-height: 30vh;
  height: 100%;
`;

const Schedules = styled.div`
  display: flex;
  height: 100%;
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
  border-bottom: 1px solid red;
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
