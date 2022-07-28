import { FormEvent, useState } from "react";
import styled from "styled-components";
import { PrimaryBtn, SecondaryButton } from "../Components/Button";
import Selectbox from "../Components/Selectbox";
import Title from "../Components/Title";
import { DaysType } from "./main";

export default function AddSchedule() {
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [startTime, setStartTime] = useState<[string, string]>(["09", "00"]);

  const toggleDay = (day: DaysType) =>
    setSelectedDays((prevState) => ({ ...prevState, [day]: !prevState[day] }));

  const filterSelectedDay = () =>
    Object.entries(selectedDays).filter((day) => day[1] && day);

  const invokeSaveSchedule = (event: FormEvent) => {
    event.preventDefault();

    const filteredSelectedDay = filterSelectedDay();

    if (filteredSelectedDay.length === 0) return;

    const data = {
      startTime: startTime.join(""),
      day: filteredSelectedDay.map((day) => day[0]),
    };
    console.log("data", data);
  };

  return (
    <Contents>
      <Header>
        <Title text="Add class schedule" />
      </Header>
      <Form onSubmit={invokeSaveSchedule}>
        <Row>
          <Column>Start time</Column>
          <Column>
            <Selectbox startTime={startTime} setStartTime={setStartTime} />
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
                  text={day}
                  isActivation={isSelect}
                  onClick={() => toggleDay(day as DaysType)}
                />
              ))}
          </Column>
        </Row>
        <SaveButton type="submit">Save</SaveButton>
      </Form>
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
const Form = styled.form`
  position: relative;
  padding: 1rem;
  background-color: white;
  max-height: 30vh;
  height: 100%;
`;

const Column = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  :first-child {
    width: fit-content;
    white-space: nowrap;
  }
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  height: 40%;
  width: 100%;
  gap: 2rem;
`;

const SaveButton = styled(PrimaryBtn)`
  position: absolute;
  right: 0;
  bottom: -3.5rem;
`;
