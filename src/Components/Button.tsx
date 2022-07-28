import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isActivation?: boolean;
}

export function PrimaryButton({ text, ...rest }: ButtonProps) {
  return <PrimaryBtn {...rest}>{text}</PrimaryBtn>;
}

export function SecondaryButton({ text, isActivation, ...rest }: ButtonProps) {
  return (
    <SecondaryBtn {...rest} isActivation={isActivation}>
      {text}
    </SecondaryBtn>
  );
}

export const SecondaryBtn = styled.button<{ isActivation?: boolean }>`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  background-color: white;
  border: 1px solid ${(props) => (props.isActivation ? "gray" : "lightgray")};
  cursor: pointer;
  color: ${(props) => (props.isActivation ? "gray" : "lightgray")};
`;

export const PrimaryBtn = styled(SecondaryBtn)`
  padding: 0.6rem 0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #3766f3;
  color: white;
  font-weight: 500;
  width: fit-content;
  border: none;
  width: 12rem;
  span {
    display: block;
    color: gray;
  }
`;
