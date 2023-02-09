import { useMutation } from '@apollo/client';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useUpload from '../../hooks/useUpload';
import { IInputOptions } from '../../interfaces';
import { UPDATE_RISK_CATEGORY_TYPE } from '../../requests/mutations';
import { bucketUrl } from '../../utils/constants';
import Alert from '../Alerts/Alert';
import Form from '../Form';
import InputFile from './InputFile';

interface IProps {
  setAlertUpdate: Dispatch<SetStateAction<boolean>>;
  riskCategoryType: IInputOptions;
  riskCategoryId: string;
}

interface IState {
  name: string;
  img: File | null;
  imgUrl?: string;
  id: string;
}
interface IPropsFields {
  setState: Dispatch<SetStateAction<IState>>;
  state: IState;
}

function TypeFields({ setState, state }: IPropsFields) {
  const { t } = useTranslation();
  return (
    <>
      <div className="field">
        <span>{`${t('riskCategory.NAME')}`} : </span>
        <input
          type="text"
          name="name"
          placeholder={`${t('riskCategory.NAME')}`}
          onChange={e =>
            setState(prev => ({
              ...prev,
              name: e.target.value,
            }))
          }
          value={state.name}
        />
      </div>
      <div className="field">
        <span>{`${t('riskCategory.IMAGE')}`} : </span>
        <InputFile
          id="risk-category-type-img"
          onChange={e =>
            setState(prev => ({
              ...prev,
              img: e.target.files && e.target.files[0],
            }))
          }
          ref={undefined}
        >
          <img
            src={
              state.img ? URL.createObjectURL(state.img as File) : state.imgUrl
            }
            alt="risk category type"
            className="img-upload"
          />
        </InputFile>
      </div>
    </>
  );
}

function UpdateRiskCategoryType({
  setAlertUpdate,
  riskCategoryType,
  riskCategoryId,
}: IProps) {
  const [newRiskCategoryType, setNewRiskCategoryType] = useState<IState>({
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
        <TypeFields
          setState={setNewRiskCategoryType}
          state={newRiskCategoryType}
        />
      </Form>
    </Alert>
  );
}

export default UpdateRiskCategoryType;
