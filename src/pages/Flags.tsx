import React from 'react';
import { useTranslation } from 'react-i18next';

function Flags() {
  const { t } = useTranslation();
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
        </table>
      </div>
    </div>
  );
}

export default Flags;
