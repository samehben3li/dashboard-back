import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { IRiskCategory } from '../../interfaces';
import InputFile from './InputFile';

interface IProps {
  updateMode: boolean;
  riskCategory: IRiskCategory;
  setRiskCategory: Dispatch<SetStateAction<IRiskCategory>>;
  image: File | null;
  setImage: Dispatch<React.SetStateAction<File | null>>;
  children: ReactNode;
}

interface IPropsInfoItem {
  infoKey: string;
  children: ReactNode;
}

function InfoItem({ infoKey, children }: IPropsInfoItem) {
  const { t } = useTranslation();
  return (
    <div className="info-item">
      <span className="info-key">{t(`riskCategory.${infoKey}`)} : </span>
      {children}
    </div>
  );
}

function RiskCategoryInfo({
  updateMode,
  riskCategory,
  setRiskCategory,
  image,
  setImage,
  children,
}: IProps) {
  const { t } = useTranslation();
  return (
    <div className="info-container">
      <InfoItem infoKey="NAME">
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
      </InfoItem>
      <InfoItem infoKey="IMAGE">
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
      </InfoItem>
      {children}
    </div>
  );
}

export default RiskCategoryInfo;
