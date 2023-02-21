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
import {
  Button,
  ButtonOpenAlert,
  CancelButton,
  Content,
  Error,
  RiskCategoryInfo,
  Table,
} from '../components/common';
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
          <CancelButton
            setOpenedAlert={setUpdateMode}
            addedClassName={undefined}
          />
        </>
      ) : (
        <>
          <ButtonOpenAlert
            className="update"
            setOpenedAlert={setUpdateMode}
            action="actions.UPDATE"
          />
          <ButtonOpenAlert
            className="delete"
            setOpenedAlert={setAlertDelete}
            action="actions.DELETE"
          />
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
        <ButtonOpenAlert
          className="add"
          setOpenedAlert={setAlertAdd}
          action="actions.NEW_TYPES"
        />
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
      <RiskCategoryInfo
        updateMode={updateMode}
        riskCategory={riskCategory}
        setRiskCategory={setRiskCategory}
        image={image}
        setImage={setImage}
      >
        <TypesContainer
          setAlertAdd={setAlertAdd}
          riskCategory={riskCategory}
          setRiskCategory={setRiskCategory}
        />
      </RiskCategoryInfo>
    </Content>
  );
}

export default RiskCategory;
