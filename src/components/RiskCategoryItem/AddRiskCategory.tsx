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
import { CREATE_RISK_CATEGORY } from '../../requests/mutations';
import { bucketUrl } from '../../utils/constants';

interface IState {
  name: string;
  img?: File | null;
  imgUrl?: string;
  imgName: string;
}

interface IRiskCategory extends IState {
  riskCategoryTypes: { name: string; imgUrl: string }[];
}

interface IProps {
  setAlertAddRiskCategory: Dispatch<SetStateAction<boolean>>;
}

function AddRiskCategory({ setAlertAddRiskCategory }: IProps) {
  const { t } = useTranslation();
  const [riskCategory, setRiskCategory] = useState<IRiskCategory>({
    name: '',
    imgName: '',
    riskCategoryTypes: [],
  });
  const [riskCategoryType, setRiskCategoryType] = useState<IState>({
    name: '',
    imgUrl: '',
    imgName: '',
  });
  const [error, setError] = useState(false);
  const [riskCategoryTypes, setRiskCategoryTypes] = useState<IState[]>([]);
  const inputImgRef: RefObject<HTMLInputElement> = useRef(null);
  const [createRiskCategory, { loading }] = useMutation(CREATE_RISK_CATEGORY);
  const { upload } = useUpload();
  const { dispatch } = useContext(AppContext);

  const handleDeleteTypes = (name: string) => {
    setRiskCategoryTypes(prev => prev.filter(r => r.name !== name));
    setRiskCategory(prev => ({
      ...prev,
      riskCategoryTypes: prev.riskCategoryTypes.filter(r => r.name !== name),
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
      riskCategoryTypes: [
        ...prev.riskCategoryTypes,
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
    setRiskCategoryType({
      name: '',
      img: null,
      imgUrl: '',
      imgName: '',
    });
    if (inputImgRef.current) {
      inputImgRef.current.value = '';
    }
  };

  const uploadImgs = async () => {
    riskCategoryTypes.forEach(async element => {
      await upload(element.imgName, element.img as File);
    });
  };

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
            riskCategoryTypes: riskCategory.riskCategoryTypes,
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
    setError(false);
    addRiskCategory()
      .then(res =>
        dispatch(ADD_RISK_CATEGORY_ACTION(res?.data?.createRiskCategory)),
      )
      .then(() => uploadImgs())
      .then(() => setAlertAddRiskCategory(false))
      .catch(() => setError(true));
  };
  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <span className="alert-title">{`${t(
          'titles.ADD_RISk_CATEGORY',
        )}`}</span>
        <div className="hr" />
        <form onSubmit={handleSubmit}>
          {error && (
            <span className="error">{`${t(
              'errors.SOMETHING_WENT_WRONG',
            )}`}</span>
          )}
          <div className="field">
            <span>{`${t('riskCategory.NAME')}`} : </span>
            <input
              type="text"
              name="name"
              onChange={e =>
                setRiskCategory({ ...riskCategory, name: e.target.value })
              }
              value={riskCategory.name}
              placeholder={`${t('riskCategory.NAME')}`}
            />
          </div>
          <div className="field">
            <span>{`${t('riskCategory.IMAGE')}`} : </span>
            <label htmlFor="risk-category-img">
              {riskCategory.img ? (
                <img
                  src={URL.createObjectURL(riskCategory.img)}
                  alt="risk category"
                  className="img-upload"
                />
              ) : (
                <i className="fa-regular fa-image upload-icon" />
              )}
              <input
                type="file"
                className="hidden"
                id="risk-category-img"
                onChange={e =>
                  setRiskCategory({
                    ...riskCategory,
                    img: e.target.files && e.target.files[0],
                  })
                }
                accept="image/png, image/svg+xml, image/jpeg, image/jpg"
              />
            </label>
          </div>
          <span className="alert-subtitle">
            {`${t('riskCategory.RISK_CATEGORY_TYPES')}`} :
          </span>
          <div className="sub-field">
            <table>
              <thead>
                <th>{`${t('riskCategory.NAME')}`}</th>
                <th>{`${t('riskCategory.IMAGE')}`}</th>
                <th>{`${t('actions.ADD')}`}</th>
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
                    <label htmlFor="risk-category-img-type">
                      {riskCategoryType.img ? (
                        <img
                          src={URL.createObjectURL(riskCategoryType.img)}
                          alt="risk category type"
                        />
                      ) : (
                        <i className="fa-regular fa-image upload-icon" />
                      )}
                      <input
                        type="file"
                        className="hidden"
                        id="risk-category-img-type"
                        onChange={e =>
                          setRiskCategoryType({
                            ...riskCategoryType,
                            img: e.target.files && e.target.files[0],
                          })
                        }
                        accept="image/png, image/svg+xml, image/jpeg, image/jpg"
                        ref={inputImgRef}
                      />
                    </label>
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
          <div className="btns">
            <button
              type="button"
              className="btn btn-cancel full-width"
              onClick={() => setAlertAddRiskCategory(false)}
            >
              {`${t('actions.CANCEL')}`}
            </button>
            <button
              type="submit"
              className="btn btn-add full-width"
              disabled={loading}
            >
              {`${t('actions.CREATE')}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRiskCategory;
