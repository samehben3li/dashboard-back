import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_RISK_CATEGORY } from '../requests/queries';
import { IRiskCategory } from '../interfaces';

function RiskCategory() {
  const [riskCategory, setRiskCategory] = useState<IRiskCategory>();
  const { id } = useParams();
  const { data } = useQuery(GET_RISK_CATEGORY, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    setRiskCategory(data?.getRiskCategory);
  }, [data]);

  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Risk Category</h2>
          <div className="btns btns-end">
            <button className="btn btn-update" type="button">
              Edit
            </button>
            <button className="btn btn-delete" type="button">
              Delete
            </button>
          </div>
        </div>
        <div className="risk-category-container">
          <div className="risk-category">
            <span className="risk-category-key">Name : </span>
            <span className="risk-category-value">{riskCategory?.name}</span>
          </div>
          <div className="risk-category">
            <span className="risk-category-key">Image : </span>
            <div className="risk-category-value">
              <img
                src={riskCategory?.imgUrl}
                className="risk-category-value-img"
                alt="category"
              />
            </div>
          </div>
          <div className="content-header">
            <h3>Types </h3>
            <button className="btn btn-add" type="button">
              New Type
            </button>
          </div>
          <table>
            <thead>
              <th>ID</th>
              <th>NAME</th>
              <th>IMAGE</th>
              <th>UPDATE</th>
              <th>DELETE</th>
            </thead>
            {/* {riskCategory?.riskCategoryTypes?.map((riskCategoryType, index) => (
            <RiskCategoryType
              key={index}
              riskCategoryType={riskCategoryType}
              index={index}
              riskCategoryId={id}
              setRiskCategory={setRiskCategory} 
            />
          ))} */}
          </table>
        </div>
      </div>
    </div>
  );
}

export default RiskCategory;
