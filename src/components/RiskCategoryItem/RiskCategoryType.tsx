import React, { Dispatch, SetStateAction, useState } from 'react';
import { IInputOptions, IRiskCategory } from '../../interfaces';
import Actions from '../Actions';
import DeleteRiskCategoryType from './DeleteRiskCategoryType';
import UpdateRiskCategoryType from './UpdateRiskCategoryType';

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
  const [alertUpdate, setAlertUpdate] = useState(false);

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
        {alertUpdate && (
          <UpdateRiskCategoryType
            setAlertUpdate={setAlertUpdate}
            riskCategoryType={riskCategoryType}
            riskCategoryId={riskCategoryId}
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
      <Actions
        updateAction={() => setAlertUpdate(true)}
        deleteAction={() => setAlertDelete(true)}
      />
    </tr>
  );
}

export default RiskCategoryType;
