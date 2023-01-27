import React from 'react';
import { Link } from 'react-router-dom';
import { IRiskCategory } from '../../interfaces';

interface IProps {
  riskCategory: IRiskCategory;
  index: number;
}

function RiskCategoryItem({ riskCategory, index }: IProps) {
  return (
    <tr>
      <td>
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
        <div className="icon-container update">
          <i className="fa-solid fa-pen-to-square icon icon-update" />
        </div>
      </td>
      <td>
        <div className="icon-container delete">
          <i className="fa-sharp fa-solid fa-trash icon icon-delete" />
        </div>
      </td>
    </tr>
  );
}

export default RiskCategoryItem;
