import React, { Dispatch, SetStateAction, useState } from 'react';
import { IInputOptions, IRiskCategory } from '../../interfaces';
import DeleteRiskCategoryType from './DeleteRiskCategoryType';

interface IProps {
  riskCategoryId: string;
  riskCategoryType: IInputOptions;
  index: number;
  setRiskCategory: Dispatch<SetStateAction<IRiskCategory>>;
}

function RiskCategoryType({
  index,
  riskCategoryType,
  riskCategoryId,
  setRiskCategory,
}: IProps) {
  const [alertDelete, setAlertDelete] = useState(false);

  return (
    <tr>
      <td>
        {alertDelete && (
          <DeleteRiskCategoryType
            setAlertDelete={setAlertDelete}
            riskCategoryType={riskCategoryType}
            riskCategoryId={riskCategoryId}
            setRiskCategory={setRiskCategory}
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
