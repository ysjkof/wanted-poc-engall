import { ReactNode } from 'react';
import styled from 'styled-components';
import Title from './Title';

interface PageLayoutProps {
  title: string;
  contents: ReactNode;
  titltLink?: ReactNode;
}
export default function PageLayout({
  title,
  contents,
  titltLink,
}: PageLayoutProps) {
  return (
    <Contents>
      <Header>
        <Title text={title} />
        {titltLink && titltLink}
      </Header>
      <Body>{contents}</Body>
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
  min-height: 40%;
  max-height: calc(100% - 16rem);
`;
