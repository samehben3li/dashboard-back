import { useMutation } from '@apollo/client';
import React, {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ADD_RISK_CATEGORY_ACTION } from '../../context/appActions';
import { AppContext } from '../../context/AppContext';
import useUpload from '../../hooks/useUpload';
import { ICategory, ITypes } from '../../interfaces';
import { CREATE_RISK_CATEGORY } from '../../requests/mutations';
import {
  bucketUrl,
  initStateCategory,
  initStateType,
} from '../../utils/constants';
import Alert from '../Alerts/Alert';
import Form from '../Form';
import Fields from './Fields';
import InputFile from './InputFile';

interface IProps {
  setAlertAddRiskCategory: Dispatch<SetStateAction<boolean>>;
}

function AddRiskCategory({ setAlertAddRiskCategory }: IProps) {
  const { t } = useTranslation();
  const [riskCategory, setRiskCategory] =
    useState<ICategory>(initStateCategory);
  const [riskCategoryType, setRiskCategoryType] =
    useState<ITypes>(initStateType);
  const [error, setError] = useState({ status: false, message: '' });
  const [riskCategoryTypes, setRiskCategoryTypes] = useState<ITypes[]>([]);
  const inputImgRef: RefObject<HTMLInputElement> = useRef(null);
  const [createRiskCategory, { loading }] = useMutation(CREATE_RISK_CATEGORY);
  const { upload } = useUpload();
  const { dispatch } = useContext(AppContext);

  const handleDeleteTypes = (name: string) => {
    setRiskCategoryTypes(prev => prev.filter(r => r.name !== name));
    setRiskCategory(prev => ({
      ...prev,
      types: (prev.types as ITypes[]).filter(r => r.name !== name),
    }));
  };

  const handleAdd = async () => {
    const fileExtension = riskCategoryType.img?.name.split('.').pop() || '';
    const imgName = `risk-category-type/${
      riskCategoryType.name
    }${Date.now()}.${fileExtension}`;
    const imgUrl = `${bucketUrl}${imgName}`;
    setRiskCategory(prev => ({
      ...prev,
      types: [
        ...(prev.types as ITypes[]),
        { name: riskCategoryType.name, imgUrl },
      ],
    }));
    setRiskCategoryTypes(prev => [
      ...prev,
      {
        name: riskCategoryType.name,
        img: riskCategoryType.img,
        imgName,
        imgUrl,
      },
    ]);
    setRiskCategoryType(initStateType);
    if (inputImgRef.current) {
      inputImgRef.current.value = '';
    }
  };

  const uploadImgs = async () =>
    Promise.all(
      riskCategoryTypes.map(async element => {
        await upload(element.imgName as string, element.img as File);
      }),
    );

  const addRiskCategory = () => {
    const { name, img } = riskCategory;
    const fileExtension = img?.name.split('.').pop() || '';
    const imgName = `risk-category/${name}${Date.now()}.${fileExtension}`;
    const imgUrl = `${bucketUrl}${imgName}`;
    setRiskCategory(prev => ({ ...prev, imgName, imgUrl }));
    return upload(imgName, riskCategory.img as File)
      .then(() =>
        createRiskCategory({
          variables: {
            name,
            imgUrl,
            riskCategoryTypes: riskCategory.types,
          },
        }),
      )
      .then(res => res)
      .catch(err => {
        throw err;
      });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    addRiskCategory()
      .then(res =>
        dispatch(ADD_RISK_CATEGORY_ACTION(res?.data?.createRiskCategory)),
      )
      .then(() => uploadImgs())
      .then(() => setAlertAddRiskCategory(false))
      .catch(({ message }) =>
        setError({
          status: true,
          message: (message as string) || 'SOMETHING_WENT_WRONG',
        }),
      );
  };
  return (
    <Alert title="titles.ADD_RISk_CATEGORY">
      <Form
        onSubmit={handleSubmit}
        setOpenedAlert={setAlertAddRiskCategory}
        error={error}
        action="actions.CREATE"
        loading={loading}
      >
        <Fields
          setState={setRiskCategory}
          state={riskCategory}
          id="risk-category-img"
        />
        <span className="alert-subtitle">
          {`${t('riskCategory.RISK_CATEGORY_TYPES')}`} :
        </span>
        <div className="sub-field">
          <table>
            <thead>
              <tr>
                <th>{`${t('riskCategory.NAME')}`}</th>
                <th>{`${t('riskCategory.IMAGE')}`}</th>
                <th>{`${t('actions.ADD')}`}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
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
                </td>
                <td>
                  <InputFile
                    id="risk-category-img-type"
                    onChange={e =>
                      setRiskCategoryType({
                        ...riskCategoryType,
                        img: e.target.files && e.target.files[0],
                      })
                    }
                    ref={inputImgRef}
                  >
                    {riskCategoryType.img ? (
                      <img
                        src={URL.createObjectURL(riskCategoryType.img)}
                        alt="risk category type"
                      />
                    ) : (
                      <i className="fa-regular fa-image upload-icon" />
                    )}
                  </InputFile>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-add"
                    onClick={handleAdd}
                  >
                    {`${t('actions.ADD')}`}
                  </button>
                </td>
              </tr>
              {riskCategoryTypes.map(rct => (
                <tr key={rct.name}>
                  <td>
                    <span>{rct.name}</span>
                  </td>
                  <td>
                    {rct.img ? (
                      <img
                        src={URL.createObjectURL(rct.img)}
                        alt="risk category type"
                        className="img-upload"
                      />
                    ) : (
                      <i className="fa-regular fa-image upload-icon" />
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="icon-container delete"
                      onClick={() => handleDeleteTypes(rct.name)}
                    >
                      <i className="fa-sharp fa-solid fa-trash icon icon-delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Form>
    </Alert>
  );
}

export default AddRiskCategory;
