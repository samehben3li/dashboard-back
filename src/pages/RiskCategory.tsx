import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GET_RISK_CATEGORY } from '../requests/queries';
import { IRiskCategory } from '../interfaces';
import { RiskCategoryType } from '../components/RiskCategoryItem';
import { DELETE_RISK_CATEGORY } from '../requests/mutations';

function RiskCategory() {
  const [riskCategory, setRiskCategory] = useState<IRiskCategory>();
  const [error, setError] = useState(false);
  const { id } = useParams();
  const { data } = useQuery(GET_RISK_CATEGORY, {
    variables: {
      id,
    },
  });
  const [deleteRiskCategory, { loading }] = useMutation(DELETE_RISK_CATEGORY);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setRiskCategory(data?.getRiskCategory);
  }, [data]);

  const handleDelete = async () => {
    setError(false);
    try {
      const response = await deleteRiskCategory({
        variables: {
          id: riskCategory?.id,
        },
      });
      if (response?.data?.deleteRiskCategory === 'RISK_CATEGORY_DELETED') {
        navigate('/riskcategories');
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="content">
      <div className="content-container">
        {error && (
          <span className="error">{t('errors.SOMETHING_WENT_WRONG')}</span>
        )}
        <div className="content-header">
          <h2>{`${t('riskCategory.RISK_CATEGORY')}`}</h2>
          <div className="btns btns-end">
            <button className="btn btn-update" type="button">
              {`${t('actions.UPDATE')}`}
            </button>
            <button
              className="btn btn-delete"
              type="button"
              onClick={handleDelete}
              disabled={loading}
            >
              {`${t('actions.DELETE')}`}
            </button>
          </div>
        </div>
        <div className="info-container">
          <div className="info-item">
            <span className="info-key">{`${t('riskCategory.NAME')}`} : </span>
            <span className="info-value">{riskCategory?.name}</span>
          </div>
          <div className="info-item">
            <span className="info-key">{`${t('riskCategory.IMAGE')}`} : </span>
            <div className="info-value">
              <img src={riskCategory?.imgUrl} alt="category" />
            </div>
          </div>
          <div className="content-header">
            <h3>{`${t('riskCategory.TYPES')}`} </h3>
            <button className="btn btn-add" type="button">
              {`${t('actions.NEW_TYPES')}`}
            </button>
          </div>
          <table>
            <thead>
              <th>{`${t('riskCategory.ID')}`}</th>
              <th>{`${t('riskCategory.NAME')}`}</th>
              <th>{`${t('riskCategory.IMAGE')}`}</th>
              <th>{`${t('actions.UPDATE')}`}</th>
              <th>{`${t('actions.DELETE')}`}</th>
            </thead>
            <tbody>
              {riskCategory?.riskCategoryTypes?.map(
                (riskCategoryType, index) => (
                  <RiskCategoryType
                    key={riskCategoryType.id}
                    riskCategoryType={riskCategoryType}
                    index={index}
                  />
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RiskCategory;
