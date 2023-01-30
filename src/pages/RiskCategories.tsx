import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiskCategoryItem } from '../components/RiskCategoryItem';
import { IRiskCategory } from '../interfaces';
import DashboardHeader from '../components/DashboardHeader';
import { AppContext } from '../context/AppContext';

function RiskCategories() {
  const [alertAddRiskCategory, setAlertAddRiskCategory] = useState(false);
  const { t } = useTranslation();
  const { riskCategories } = useContext(AppContext);

  return (
    <div className="content">
      <DashboardHeader
        btnText={`${t('header.NEW_RISK_CATEGORY')}`}
        onClick={() => setAlertAddRiskCategory(true)}
      />

      <div className="content-container">
        <div className="content-header">
          <h2>{`${t('titles.RISK_CATEGORIES_LIST')}`}</h2>
        </div>
        <table>
          <thead>
            <th>{`${t('riskCategory.ID')}`}</th>
            <th>{`${t('riskCategory.NAME')}`}</th>
            <th>{`${t('riskCategory.IMAGE')}`}</th>
            <th>{`${t('actions.UPDATE')}`}</th>
            <th>{`${t('actions.DELETE')}`}</th>
          </thead>
          {riskCategories?.length !== 0 ? (
            <tbody>
              {riskCategories?.map((riskcategory: IRiskCategory, index) => (
                <RiskCategoryItem
                  key={riskcategory.id}
                  riskCategory={riskcategory}
                  index={index}
                />
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}

export default RiskCategories;
