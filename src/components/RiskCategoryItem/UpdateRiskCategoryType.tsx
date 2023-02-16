import { useMutation } from '@apollo/client';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useUpload } from '../../hooks';
import { IInputOptions, ITypes } from '../../interfaces';
import { UPDATE_RISK_CATEGORY_TYPE } from '../../requests/mutations';
import { bucketUrl } from '../../utils/constants';
import { Alert, Form, RiskCategoryFields } from '../common';

interface IProps {
  setAlertUpdate: Dispatch<SetStateAction<boolean>>;
  riskCategoryType: IInputOptions;
  riskCategoryId: string;
}

function UpdateRiskCategoryType({
  setAlertUpdate,
  riskCategoryType,
  riskCategoryId,
}: IProps) {
  const [newRiskCategoryType, setNewRiskCategoryType] = useState<ITypes>({
    img: null,
    ...riskCategoryType,
  });
  const { upload } = useUpload();
  const [updateRiskCategoryType, { loading }] = useMutation(
    UPDATE_RISK_CATEGORY_TYPE,
  );
  const [error, setError] = useState({ status: false, message: '' });

  const uploadImage = () => {
    const fileExtension = newRiskCategoryType.img?.name.split('.').pop() || '';
    const imgName = `risk-category-type/${
      newRiskCategoryType.name
    }${Date.now()}.${fileExtension}`;
    const imgUrl = `${bucketUrl}${imgName}`;
    setNewRiskCategoryType(prev => ({ ...prev, imgUrl }));
    upload(imgName, newRiskCategoryType.img as File)
      .then(res => res)
      .catch(err => {
        throw err;
      });
    return imgUrl;
  };
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    let newImgUrl = null;
    if (newRiskCategoryType.img) {
      newImgUrl = uploadImage();
    }
    updateRiskCategoryType({
      variables: {
        riskCategoryId,
        riskCategoryTypeId: newRiskCategoryType.id,
        riskCategoryType: {
          name: newRiskCategoryType.name,
          imgUrl: newImgUrl || riskCategoryType.imgUrl,
        },
      },
    })
      .then(() => {
        setAlertUpdate(false);
      })
      .catch(({ message }) => {
        setError({
          status: true,
          message: (message as string) || 'SOMETHING_WENT_WRONG',
        });
      });
  };
  return (
    <Alert title="titles.UPDATE_RISk_CATEGORY_TYPE">
      <Form
        onSubmit={handleUpdate}
        setOpenedAlert={setAlertUpdate}
        loading={loading}
        action="actions.UPDATE"
        error={error}
      >
        <RiskCategoryFields
          setState={setNewRiskCategoryType}
          state={newRiskCategoryType}
          id="risk-category-type-img"
        />
      </Form>
    </Alert>
  );
}

export default UpdateRiskCategoryType;
