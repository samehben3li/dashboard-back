import React, { ReactNode } from 'react';
import Content from './Content';
import Error from './Error';
import Table from './Table';

interface IProps {
  title: string;
  theads: string[];
  children: ReactNode;
  dashboardHeader: ReactNode | undefined;
  error: {
    status: boolean;
    message: string;
  };
}

function Container({
  title,
  theads,
  children,
  dashboardHeader,
  error,
}: IProps) {
  return (
    <Content title={title} dashboardHeader={dashboardHeader}>
      {error.status && <Error message={error.message} />}
      <Table theads={theads}>{children}</Table>
    </Content>
  );
}

export default Container;
