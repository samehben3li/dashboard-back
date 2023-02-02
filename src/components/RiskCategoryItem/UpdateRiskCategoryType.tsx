import { useMutation } from '@apollo/client';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useUpload from '../../hooks/useUpload';
import { IInputOptions } from '../../interfaces';
import { UPDATE_RISK_CATEGORY_TYPE } from '../../requests/mutations';
import { bucketUrl } from '../../utils/constants';

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
  const { t } = useTranslation();
  const [image, setImage] = useState<File | null>();
  const [newRiskCategoryType, setNewRiskCategoryType] = useState<IInputOptions>(
    {
      ...riskCategoryType,
    },
  );
  const { upload } = useUpload();
  const [updateRiskCategoryType, { loading }] = useMutation(
    UPDATE_RISK_CATEGORY_TYPE,
  );
  const [error, setError] = useState({ status: false, message: '' });

  const uploadImage = () => {
    const fileExtension = image?.name.split('.').pop() || '';
    const imgName = `risk-category-type/${
      newRiskCategoryType.name
    }${Date.now()}.${fileExtension}`;
    const imgUrl = `${bucketUrl}${imgName}`;
    setNewRiskCategoryType(prev => ({ ...prev, imgUrl }));
    upload(imgName, image as File)
      .then(res => res)
      .catch(err => {
        throw err;
      });
    return imgUrl;
  };
  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    let newImgUrl = null;
    if (image) {
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
    <div className="alert-container">
      <div className="alert-wrapper">
        <span className="alert-title">{`${t(
          'titles.UPDATE_RISk_CATEGORY_TYPE',
        )}`}</span>
        <div className="hr" />
        <form onSubmit={handleUpdate}>
          {error.status && (
            <span className="error">{`${t(`errors.${error.message}`)}`}</span>
          )}
          <div className="field">
            <span>{`${t('riskCategory.NAME')}`} : </span>
            <input
              type="text"
              name="name"
              placeholder={`${t('riskCategory.NAME')}`}
              onChange={e =>
                setNewRiskCategoryType({
                  ...newRiskCategoryType,
                  name: e.target.value,
                })
              }
              value={newRiskCategoryType.name}
            />
          </div>
          <div className="field">
            <span>{`${t('riskCategory.IMAGE')}`} : </span>
            <label htmlFor="risk-category-type-img">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : newRiskCategoryType.imgUrl
                }
                alt="risk category type"
                className="img-upload"
              />
              <input
                type="file"
                className="hidden"
                id="risk-category-type-img"
                accept="image/png, image/svg+xml, image/jpeg, image/jpg"
                onChange={e => setImage(e.target.files && e.target.files[0])}
              />
            </label>
          </div>

          <div className="btns">
            <button
              type="button"
              className="btn btn-cancel full-width"
              onClick={() => setAlertUpdate(false)}
            >
              {`${t('actions.CANCEL')}`}
            </button>
            <button
              type="submit"
              className="btn btn-add full-width"
              disabled={loading}
            >
              {`${t('actions.UPDATE')}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateRiskCategoryType;
