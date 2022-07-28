import styled from "styled-components";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <Container>
      <Logo>engall</Logo>
    </Container>
  );
}

const Container = styled.div`
  background-color: #00afca;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: white;
`;
