import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

export default function AppLayout() {
  return (
    <Container>
      <Header />
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e4e4e4;
`;

const Body = styled.div`
  height: calc(100% - 4rem);
`;
