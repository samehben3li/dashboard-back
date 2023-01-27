import React from 'react';
import { IInputOptions } from '../../interfaces';

interface IProps {
  riskCategoryType: IInputOptions;
  index: number;
}

function RiskCategoryType({ index, riskCategoryType }: IProps) {
  return (
    <tr>
      <td>
        <span>{index + 1}</span>
      </td>
      <td>
        <span>{riskCategoryType.name}</span>
      </td>
      <td>
        <img src={riskCategoryType.imgUrl} alt="imgUrl" />
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

export default RiskCategoryType;
