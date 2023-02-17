import { useMutation } from '@apollo/client';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ADD_RISK_CATEGORY_TYPE } from '../../requests/mutations';
import { bucketUrl } from '../../utils/constants';
import { IRiskCategory } from '../../interfaces';
import { Alert, Form, InputFile } from '../common';
import { useUpload } from '../../hooks';

interface IProps {
  riskCategoryId: string;
  setAlertAdd: Dispatch<SetStateAction<boolean>>;
  setRiskCategory: Dispatch<SetStateAction<IRiskCategory>>;
}

interface IState {
  name: string;
  img: File | null;
  imgUrl?: string;
}

function AddRiskCategoryType({
  setAlertAdd,
  riskCategoryId,
  setRiskCategory,
}: IProps) {
  const { t } = useTranslation();
  const { upload } = useUpload();
  const [riskCategoryType, setRiskCategoryType] = useState<IState>({
    name: '',
    img: null,
  });
  const [error, setError] = useState({ status: false, message: '' });
  const [addRiskCategoryType, { loading }] = useMutation(
    ADD_RISK_CATEGORY_TYPE,
  );

  const uploadImage = () => {
    const { name, img } = riskCategoryType;
    const fileExtension = img?.name.split('.').pop() || '';
    const imgName = `risk-category-type/${name}${Date.now()}.${fileExtension}`;
    const imgUrl = `${bucketUrl}${imgName}`;
    setRiskCategoryType(prev => ({ ...prev, imgUrl }));
    upload(imgName, img as File)
      .then(res => res)
      .catch(err => {
        throw err;
      });
    return imgUrl;
  };

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    const imgUrl = uploadImage();
    addRiskCategoryType({
      variables: { id: riskCategoryId, name: riskCategoryType.name, imgUrl },
    })
      .then(res => {
        setRiskCategory(prev => ({
          ...prev,
          riskCategoryTypes: [
            ...prev.riskCategoryTypes,
            res?.data.addRiskCategoryType,
          ],
        }));
        setAlertAdd(false);
      })
      .catch(({ message }) => {
        setError({
          status: true,
          message: (message as string) || 'SOMETHING_WENT_WRONG',
        });
      });
  };
  return (
    <Alert title="titles.ADD_RISK_CATEGORY_TYPE">
      <Form
        onSubmit={handleAdd}
        setOpenedAlert={setAlertAdd}
        loading={loading}
        action="actions.ADD"
        error={error}
      >
        <div className="field">
          <span>{t('riskCategory.NAME')} : </span>
          <input
            type="text"
            name="name"
            placeholder={`${t('riskCategory.NAME')}`}
            onChange={e =>
              setRiskCategoryType({
                ...riskCategoryType,
                name: e.target.value,
              })
            }
            value={riskCategoryType.name}
          />
        </div>
        <div className="field">
          <span>{t('riskCategory.IMAGE')} : </span>
          <InputFile
            id="risk-category-type-img"
            onChange={e =>
              setRiskCategoryType({
                ...riskCategoryType,
                img: e.target.files && e.target.files[0],
              })
            }
          >
            {riskCategoryType.img ? (
              <img
                src={URL.createObjectURL(riskCategoryType.img)}
                alt="risk category"
                className="img-upload"
              />
            ) : (
              <i className="fa-regular fa-image upload-icon" />
            )}
          </InputFile>
        </div>
      </Form>
    </Alert>
  );
}

export default AddRiskCategoryType;
