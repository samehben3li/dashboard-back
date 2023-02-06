import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import FlagItem from '../components/FlagItem';
import { IFlag } from '../interfaces';
import { GET_ALL_FLAGS } from '../requests/queries';
import { theadsOfFlags } from '../utils/constants';

function Flags() {
  const { data, error } = useQuery(GET_ALL_FLAGS);
  const [flags, setFlags] = useState<IFlag[]>([]);
  const [err, setErr] = useState({ status: false, message: '' });

  useEffect(() => {
    setErr(
      error?.message
        ? { status: true, message: error.message }
        : { status: false, message: '' },
    );
    setFlags(data?.getAllFlags);
  }, [data, error]);
  return (
    <Container
      title="titles.FLAGS_LIST"
      dashboardHeader={null}
      theads={theadsOfFlags}
      error={err}
    >
      {flags?.map((flag, index) => (
        <FlagItem flag={flag} index={index} key={flag.id} />
      ))}
    </Container>
  );
}

export default Flags;
