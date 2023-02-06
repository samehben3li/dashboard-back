import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Content from '../components/Content';
import FlagItem from '../components/FlagItem';
import Table from '../components/Table';
import { IFlag } from '../interfaces';
import { GET_ALL_FLAGS } from '../requests/queries';
import { theadsOfFlags } from '../utils/constants';

function Flags() {
  const { data } = useQuery(GET_ALL_FLAGS);
  const [flags, setFlags] = useState<IFlag[]>([]);

  useEffect(() => {
    if (data) {
      setFlags(data.getAllFlags);
    }
  }, [data]);
  return (
    <Content title="titles.FLAGS_LIST" dashboardHeader={null}>
      <Table theads={theadsOfFlags}>
        {flags?.length !== 0
          ? flags?.map((flag, index) => (
              <FlagItem flag={flag} index={index} key={flag.id} />
            ))
          : null}
      </Table>
    </Content>
  );
}

export default Flags;
