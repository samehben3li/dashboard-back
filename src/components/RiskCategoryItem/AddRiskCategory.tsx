import React from 'react';
import { useTranslation } from 'react-i18next';

function AddRiskCategory() {
  const { t } = useTranslation();
  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <span className="alert-title">{`${t(
          'titles.ADD_RISk_CATEGORY',
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
            <label
              htmlFor="risk-category-img"
              className="add-risk-category-img"
            >
              <i className="fa-regular fa-image upload-icon" />
              <input type="file" className="hidden" id="risk-category-img" />
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
                    />
                  </td>
                  <td>
                    <label
                      htmlFor="risk-category-img-type"
                      className="add-risk-category-img"
                    >
                      <i className="fa-regular fa-image upload-icon" />
                      <input
                        type="file"
                        className="hidden"
                        id="risk-category-img-type"
                      />
                    </label>
                  </td>
                  <td>
                    <button type="button" className="btn btn-add">
                      {`${t('actions.ADD')}`}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>test name</span>
                  </td>
                  <td>
                    <i className="fa-regular fa-image upload-icon" />
                  </td>
                  <td>
                    <button type="button" className="icon-container delete">
                      <i className="fa-sharp fa-solid fa-trash icon icon-delete" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="btns">
            <button type="button" className="btn btn-cancel full-width">
              {`${t('actions.CANCEL')}`}
            </button>
            <button type="submit" className="btn btn-add full-width">
              {`${t('actions.CREATE')}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRiskCategory;
