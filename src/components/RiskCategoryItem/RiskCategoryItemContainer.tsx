import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IRiskCategory } from '../../interfaces';
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
        <span>{index + 1}</span>
      </td>
      <td>
        <Link to={`/riskcategories/${riskCategory.id}`} className="link">
          <span>{riskCategory.name}</span>
        </Link>
      </td>
      <td>
        <img src={riskCategory.imgUrl} alt="imgUrl" />
      </td>
      <td>
        <button
          type="button"
          className="icon-container update"
          onClick={() =>
            navigate(`/riskcategories/${riskCategory.id}`, {
              state: { isUpdateMode: true },
            })
          }
        >
          <i className="fa-solid fa-pen-to-square icon icon-update" />
        </button>
      </td>
      <td>
        <button
          type="button"
          className="icon-container delete"
          onClick={() => setAlertDelete(true)}
        >
          <i className="fa-sharp fa-solid fa-trash icon icon-delete" />
        </button>
      </td>
    </tr>
  );
}

export default RiskCategoryItem;
