import React, { useState } from 'react';
import { IInputOptions } from '../../interfaces';
import DeleteRiskCategoryType from './DeleteRiskCategoryType';

interface IProps {
  riskCategoryType: IInputOptions;
  index: number;
}

function RiskCategoryType({ index, riskCategoryType }: IProps) {
  const [alertDelete, setAlertDelete] = useState(false);

  return (
    <tr>
      <td>
        {alertDelete && (
          <DeleteRiskCategoryType
            setAlertDelete={setAlertDelete}
            riskCategoryType={riskCategoryType}
          />
        )}
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

export default RiskCategoryType;
