import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  setAlertAdd: Dispatch<SetStateAction<boolean>>;
}

function AddRiskCategoryType({ setAlertAdd }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <span className="alert-title">{`${t(
          'titles.ADD_RISk_CATEGORY_TYPE',
        )}`}</span>
        <div className="hr" />
        <form>
          <div className="field">
            <span>{`${t('riskCategory.NAME')}`} : </span>
            <input
              type="text"
              name="name"
              placeholder={`${t('riskCategory.NAME')}`}
            />
          </div>
          <div className="field">
            <span>{`${t('riskCategory.IMAGE')}`} : </span>
            <label htmlFor="risk-category-type-img">
              <i className="fa-regular fa-image upload-icon" />
              <input
                type="file"
                className="hidden"
                id="risk-category-type-img"
                accept="image/png, image/svg+xml, image/jpeg, image/jpg"
              />
            </label>
          </div>

          <div className="btns">
            <button
              type="button"
              className="btn btn-cancel full-width"
              onClick={() => setAlertAdd(false)}
            >
              {`${t('actions.CANCEL')}`}
            </button>
            <button type="submit" className="btn btn-add full-width">
              {`${t('actions.ADD')}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRiskCategoryType;
