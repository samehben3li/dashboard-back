import React, { useContext, useState } from 'react';
import { RiskCategoryItem } from '../components/RiskCategoryItem';
import { IRiskCategory } from '../interfaces';
import DashboardHeader from '../components/common/DashboardHeader';
import { AppContext } from '../context/AppContext';
import AddRiskCategory from '../components/RiskCategoryItem/AddRiskCategory';
import Container from '../components/common/Container';
import { theadsOfRiskCategory } from '../utils/constants';

function RiskCategories() {
  const [alertAddRiskCategory, setAlertAddRiskCategory] = useState(false);
  const { riskCategories } = useContext(AppContext);

  return (
    <Container
      title="titles.RISK_CATEGORIES_LIST"
      dashboardHeader={
        <DashboardHeader
          btnText="header.NEW_RISK_CATEGORY"
          onClick={() => setAlertAddRiskCategory(true)}
        />
      }
      theads={theadsOfRiskCategory}
      error={null}
    >
      {alertAddRiskCategory && (
        <AddRiskCategory setAlertAddRiskCategory={setAlertAddRiskCategory} />
      )}
      {riskCategories?.map((rc: IRiskCategory, index) => (
        <RiskCategoryItem key={rc.id} riskCategory={rc} index={index} />
      ))}
    </Container>
  );
}

export default RiskCategories;
