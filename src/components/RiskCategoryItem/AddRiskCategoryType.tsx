import { useMutation } from '@apollo/client';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useUpload from '../../hooks/useUpload';
import { ADD_RISK_CATEGORY_TYPE } from '../../requests/mutations';
import { bucketUrl } from '../../utils/constants';
import { IRiskCategory } from '../../interfaces';

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
  const [error, setError] = useState(false);
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

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
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
      .catch(() => {
        setError(true);
      });
  };
  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <span className="alert-title">
          {t('titles.ADD_RISK_CATEGORY_TYPE')}
        </span>
        <div className="hr" />
        <form onSubmit={handleAdd}>
          {error && (
            <span className="error">{t('errors.SOMETHING_WENT_WRONG')}</span>
          )}
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
            <label htmlFor="risk-category-type-img">
              {riskCategoryType.img ? (
                <img
                  src={URL.createObjectURL(riskCategoryType.img)}
                  alt="risk category"
                  className="img-upload"
                />
              ) : (
                <i className="fa-regular fa-image upload-icon" />
              )}
              <input
                type="file"
                className="hidden"
                id="risk-category-type-img"
                accept="image/png, image/svg+xml, image/jpeg, image/jpg"
                onChange={e =>
                  setRiskCategoryType({
                    ...riskCategoryType,
                    img: e.target.files && e.target.files[0],
                  })
                }
              />
            </label>
          </div>

          <div className="btns">
            <button
              type="button"
              className="btn btn-cancel full-width"
              onClick={() => setAlertAdd(false)}
            >
              {t('actions.CANCEL')}
            </button>
            <button
              type="submit"
              className="btn btn-add full-width"
              disabled={loading}
            >
              {t('actions.ADD')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRiskCategoryType;
