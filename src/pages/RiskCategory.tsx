import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GET_RISK_CATEGORY } from '../requests/queries';
import { IRiskCategory } from '../interfaces';
import {
  DeleteRiskCategory,
  RiskCategoryType,
} from '../components/RiskCategoryItem';
import { bucketUrl, theadsOfRiskCategory } from '../utils/constants';
import { UPDATE_RISK_CATEGORY } from '../requests/mutations';
import AddRiskCategoryType from '../components/RiskCategoryItem/AddRiskCategoryType';
import { Button, Content, Error, InputFile, Table } from '../components/common';
import { useUpload } from '../hooks';

interface IPropsButtons {
  updateMode: boolean;
  loading: boolean;
  handleUpdate: () => void;
  setUpdateMode: Dispatch<SetStateAction<boolean>>;
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
}

interface IPropsTypes {
  setAlertAdd: Dispatch<SetStateAction<boolean>>;
  setRiskCategory: Dispatch<SetStateAction<IRiskCategory>>;
  riskCategory: IRiskCategory;
}

const initState = {
  id: '',
  name: '',
  imgUrl: '',
  riskCategoryTypes: [],
};

function ButtonActions({
  updateMode,
  loading,
  handleUpdate,
  setUpdateMode,
  setAlertDelete,
}: IPropsButtons) {
  const { t } = useTranslation();
  return (
    <div className="btns btns-end">
      {updateMode ? (
        <>
          <Button
            className="btn btn-update"
            isSubmit={false}
            disabled={loading}
            onClick={handleUpdate}
          >
            {t('actions.SAVE')}
          </Button>
          <Button
            className="btn btn-cancel"
            onClick={() => setUpdateMode(false)}
            isSubmit={false}
            disabled={false}
          >
            {t('actions.CANCEL')}
          </Button>
        </>
      ) : (
        <>
          <Button
            className="btn btn-update"
            onClick={() => setUpdateMode(true)}
            isSubmit={false}
            disabled={false}
          >
            {t('actions.UPDATE')}
          </Button>
          <Button
            className="btn btn-delete"
            onClick={() => setAlertDelete(true)}
            isSubmit={false}
            disabled={false}
          >
            {t('actions.DELETE')}
          </Button>
        </>
      )}
    </div>
  );
}

function TypesContainer({
  setAlertAdd,
  setRiskCategory,
  riskCategory,
}: IPropsTypes) {
  const { t } = useTranslation();
  return (
    <>
      <div className="content-header">
        <h3>{t('riskCategory.TYPES')} </h3>
        <Button
          className="btn btn-add"
          onClick={() => setAlertAdd(true)}
          isSubmit={false}
          disabled={false}
        >
          {t('actions.NEW_TYPES')}
        </Button>
      </div>
      <Table theads={theadsOfRiskCategory}>
        {riskCategory?.riskCategoryTypes?.map((riskCategoryType, index) => (
          <RiskCategoryType
            key={riskCategoryType.id}
            riskCategoryType={riskCategoryType}
            index={index}
            riskCategoryId={riskCategory.id}
            setRiskCategory={setRiskCategory}
          />
        ))}
      </Table>
    </>
  );
}

function RiskCategory() {
  const location = useLocation();
  const [riskCategory, setRiskCategory] = useState<IRiskCategory>(initState);
  const [image, setImage] = useState<File | null>(null);
  const [alertDelete, setAlertDelete] = useState(false);
  const [alertAdd, setAlertAdd] = useState(false);
  const [updateMode, setUpdateMode] = useState(
    location.state?.isUpdateMode || false,
  );
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
    const fileExtension = image?.name.split('.').pop();
    const imgName = `risk-category/${riskCategory.name}${Date.now()}${
      fileExtension ? `.${fileExtension}` : ''
    }`;
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
    <Content
      title="riskCategory.RISK_CATEGORY"
      dashboardHeader={undefined}
      btns={
        <ButtonActions
          updateMode={updateMode}
          setUpdateMode={setUpdateMode}
          setAlertDelete={setAlertDelete}
          handleUpdate={handleUpdate}
          loading={loading}
        />
      }
    >
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
      {error.status && <Error message={error.message} />}
      <div className="info-container">
        <div className="info-item">
          <span className="info-key">{t('riskCategory.NAME')} : </span>
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
          <span className="info-key">{t('riskCategory.IMAGE')} : </span>
          <div className="info-value">
            <img
              src={image ? URL.createObjectURL(image) : riskCategory?.imgUrl}
              alt="category"
            />
            {updateMode && (
              <InputFile
                id="risk-category-img"
                onChange={e => setImage(e.target.files && e.target.files[0])}
              >
                <i className="fa-solid fa-pen-to-square update-img-icon" />
              </InputFile>
            )}
          </div>
        </div>
        <TypesContainer
          setAlertAdd={setAlertAdd}
          riskCategory={riskCategory}
          setRiskCategory={setRiskCategory}
        />
      </div>
    </Content>
  );
}

export default RiskCategory;
