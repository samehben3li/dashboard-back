import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GET_RISK_CATEGORY } from '../requests/queries';
import { IRiskCategory } from '../interfaces';
import {
  DeleteRiskCategory,
  RiskCategoryType,
} from '../components/RiskCategoryItem';
import { bucketUrl } from '../utils/constants';
import useUpload from '../hooks/useUpload';
import { UPDATE_RISK_CATEGORY } from '../requests/mutations';
import AddRiskCategoryType from '../components/RiskCategoryItem/AddRiskCategoryType';

function RiskCategory() {
  const [riskCategory, setRiskCategory] = useState<IRiskCategory>({
    id: '',
    name: '',
    imgUrl: '',
    riskCategoryTypes: [],
  });
  const [image, setImage] = useState<File | null>(null);
  const [alertDelete, setAlertDelete] = useState(false);
  const [alertAdd, setAlertAdd] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const { id } = useParams();
  const { upload } = useUpload();
  const [updateRiskCategory, { loading }] = useMutation(UPDATE_RISK_CATEGORY);
  const [error, setError] = useState({ status: false, message: '' });
  const { data, error: err } = useQuery(GET_RISK_CATEGORY, {
    variables: {
      id,
    },
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setRiskCategory(data?.getRiskCategory);
    if (err) {
      navigate('/riskcategories');
    }
  }, [data, err, navigate]);

  const uploadImage = () => {
    const fileExtension = image?.name.split('.').pop() || '';
    const imgName = `risk-category/${
      riskCategory.name
    }${Date.now()}.${fileExtension}`;
    const imgUrl = `${bucketUrl}${imgName}`;
    setRiskCategory(prev => ({ ...prev, imgUrl }));
    upload(imgName, image as File)
      .then(res => res)
      .catch(errs => {
        throw errs;
      });
    return imgUrl;
  };

  const handleUpdate = () => {
    setError({ status: false, message: '' });
    let newImgUrl = null;
    if (image) {
      newImgUrl = uploadImage();
    }
    const { name, imgUrl } = riskCategory;
    updateRiskCategory({
      variables: { id, name, imgUrl: newImgUrl || imgUrl },
    })
      .then(res => {
        setRiskCategory(res.data.updateRiskCategory);
        setUpdateMode(false);
      })
      .catch(({ message }) => {
        setError({
          status: true,
          message: (message as string) || 'SOMETHING_WENT_WRONG',
        });
      });
  };

  return (
    <div className="content">
      {alertDelete && riskCategory && (
        <DeleteRiskCategory
          riskCategory={riskCategory}
          setAlertDelete={setAlertDelete}
        />
      )}
      {alertAdd && (
        <AddRiskCategoryType
          setAlertAdd={setAlertAdd}
          riskCategoryId={riskCategory.id}
          setRiskCategory={setRiskCategory}
        />
      )}
      <div className="content-container">
        {error.status && (
          <span className="error">{`${t(`errors.${error.message}`)}`}</span>
        )}
        <div className="content-header">
          <h2>{`${t('riskCategory.RISK_CATEGORY')}`}</h2>
          {updateMode ? (
            <div className="btns btns-end">
              <button
                className="btn btn-update"
                type="button"
                disabled={loading}
                onClick={handleUpdate}
              >
                {`${t('actions.SAVE')}`}
              </button>
              <button
                className="btn btn-cancel"
                type="button"
                onClick={() => setUpdateMode(false)}
              >
                {`${t('actions.CANCEL')}`}
              </button>
            </div>
          ) : (
            <div className="btns btns-end">
              <button
                className="btn btn-update"
                type="button"
                onClick={() => setUpdateMode(true)}
              >
                {`${t('actions.UPDATE')}`}
              </button>
              <button
                className="btn btn-delete"
                type="button"
                onClick={() => setAlertDelete(true)}
              >
                {`${t('actions.DELETE')}`}
              </button>
            </div>
          )}
        </div>
        <div className="info-container">
          <div className="info-item">
            <span className="info-key">{`${t('riskCategory.NAME')}`} : </span>
            {updateMode ? (
              <input
                type="text"
                value={riskCategory?.name}
                placeholder={`${t('riskCategory.NAME')}`}
                onChange={e =>
                  setRiskCategory(prev => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <span className="info-value">{riskCategory?.name}</span>
            )}
          </div>
          <div className="info-item">
            <span className="info-key">{`${t('riskCategory.IMAGE')}`} : </span>
            <div className="info-value">
              <img
                src={image ? URL.createObjectURL(image) : riskCategory?.imgUrl}
                alt="category"
              />
              {updateMode && (
                <label htmlFor="risk-category-img">
                  <i className="fa-solid fa-pen-to-square update-img-icon" />
                  <input
                    type="file"
                    className="hidden"
                    id="risk-category-img"
                    onChange={e =>
                      setImage(e.target.files && e.target.files[0])
                    }
                  />
                </label>
              )}
            </div>
          </div>
          <div className="content-header">
            <h3>{`${t('riskCategory.TYPES')}`} </h3>
            <button
              className="btn btn-add"
              type="button"
              onClick={() => setAlertAdd(true)}
            >
              {`${t('actions.NEW_TYPES')}`}
            </button>
          </div>
          <table>
            <thead>
              <th>{`${t('riskCategory.ID')}`}</th>
              <th>{`${t('riskCategory.NAME')}`}</th>
              <th>{`${t('riskCategory.IMAGE')}`}</th>
              <th>{`${t('actions.UPDATE')}`}</th>
              <th>{`${t('actions.DELETE')}`}</th>
            </thead>
            <tbody>
              {riskCategory?.riskCategoryTypes?.map(
                (riskCategoryType, index) => (
                  <RiskCategoryType
                    key={riskCategoryType.id}
                    riskCategoryType={riskCategoryType}
                    index={index}
                    riskCategoryId={riskCategory.id}
                    setRiskCategory={setRiskCategory}
                  />
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RiskCategory;
