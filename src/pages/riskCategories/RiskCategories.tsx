import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import DashboardHeader from '../../components/dashboardHeader/DashboardHeader';
import RiskCategoryItem from '../../components/riskCategoryItem/RiskCategoryItem';
import { GET_RISK_CATEGORIES } from '../../requests/queries';
import { IRiskCategory } from '../../interfaces';

function RiskCategories() {
  const [alertAddRiskCategory, setAlertAddRiskCategory] = useState(false);
  const [riskCategories, setRiskCategories] = useState([]);
  const { data } = useQuery(GET_RISK_CATEGORIES);

  useEffect(() => {
    setRiskCategories(data?.getRiskCategories);
  }, [data]);

  return (
    <div className="dashboard-content">
      <DashboardHeader
        btnText="New Risk Category"
        onClick={() => setAlertAddRiskCategory(true)}
      />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Risk Categories List</h2>
        </div>
        <table>
          <thead>
            <th>ID</th>
            <th>NAME</th>
            <th>IMAGE</th>
            <th>UPDATE</th>
            <th>DELETE</th>
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
