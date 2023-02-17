import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IRiskCategory } from '../../interfaces';
import { Actions } from '../common';
import DeleteRiskCategory from './DeleteRiskCategory';

interface IProps {
  riskCategory: IRiskCategory;
  index: number;
}

function RiskCategoryItem({ riskCategory, index }: IProps) {
  const [alertDelete, setAlertDelete] = useState(false);
  const navigate = useNavigate();
  return (
    <tr>
      <td>
        {alertDelete && (
          <DeleteRiskCategory
            setAlertDelete={setAlertDelete}
            riskCategory={riskCategory}
          />
        )}
        <span>{index}</span>
      </td>
      <td>
        <Link to={`/riskcategories/${riskCategory.id}`} className="link">
          <span>{riskCategory.name}</span>
        </Link>
      </td>
      <td>
        <img src={riskCategory.imgUrl} alt="imgUrl" />
      </td>
      <Actions
        deleteAction={() => setAlertDelete(true)}
        updateAction={() =>
          navigate(`/riskcategories/${riskCategory.id}`, {
            state: { isUpdateMode: true },
          })
        }
      />
    </tr>
  );
}

export default RiskCategoryItem;
