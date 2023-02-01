import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FlagItem from '../components/FlagItem';
import { IFlag } from '../interfaces';
import { GET_ALL_FLAGS } from '../requests/queries';

function Flags() {
  const { t } = useTranslation();
  const { data } = useQuery(GET_ALL_FLAGS);
  const [flags, setFlags] = useState<IFlag[]>([]);

  useEffect(() => {
    if (data) {
      setFlags(data.getAllFlags);
    }
  }, [data]);
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>{`${t('titles.FLAGS_LIST')}`}</h2>
        </div>
        <table>
          <thead>
            <th>{`${t('flags.ID')}`}</th>
            <th>{`${t('flags.RISK_CATEGORY')}`}</th>
            <th>{`${t('flags.RISK_CATEGORY_TYPE')}`}</th>
            <th>{`${t('flags.PLANT_PART')}`}</th>
            <th>{`${t('flags.LOCATION')}`}</th>
          </thead>
          {flags?.length !== 0 ? (
            <tbody>
              {flags?.map((flag, index) => (
                <FlagItem flag={flag} index={index} key={flag.id} />
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}

export default Flags;
