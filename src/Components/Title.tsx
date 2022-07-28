import styled from "styled-components";

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return <Container>{text}</Container>;
}

const Container = styled.h1`
  font-size: 1.4rem;
  padding: 0.6rem 0;
  color: black;
  font-weight: 600;
  width: fit-content;
`;
