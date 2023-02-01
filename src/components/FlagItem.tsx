import React from 'react';
import { IFlag } from '../interfaces';

interface IProps {
  flag: IFlag;
  index: number;
}

function FlagItem({ flag, index }: IProps) {
  return (
    <tr>
      <td>
        <span>{index + 1}</span>
      </td>
      <td>
        <div className="flag-item-container">
          <img src={flag?.riskCategory?.imgUrl} alt="flag" />
          <span>{flag?.riskCategory?.name}</span>
        </div>
      </td>
      <td>
        <div className="flag-item-container">
          <img src={flag?.riskCategoryType?.imgUrl} alt="flag" />
          <span>{flag?.riskCategoryType?.name}</span>
        </div>
      </td>
      <td>
        <div className="flag-item-container">
          <img src={flag?.plantPart?.imgUrl} alt="flag" />
          <span>{flag?.plantPart?.name}</span>
        </div>
      </td>
      <td>
        <div className="location-container">
          <div className="location-side">
            <div
              className={`location-piece ${
                flag?.location?.left?.includes('TOP') ? 'active' : ''
              }`}
            />
            <div
              className={`location-piece ${
                flag?.location?.left?.includes('MIDDLE') ? 'active' : ''
              }`}
            />
            <div
              className={`location-piece ${
                flag?.location?.left?.includes('BOTTOM') ? 'active' : ''
              }`}
            />
          </div>
          <div className="location-side">
            <div
              className={`location-piece ${
                flag?.location?.right?.includes('TOP') ? 'active' : ''
              }`}
            />
            <div
              className={`location-piece ${
                flag?.location?.right?.includes('MIDDLE') ? 'active' : ''
              }`}
            />
            <div
              className={`location-piece ${
                flag?.location?.right?.includes('BOTTOM') ? 'active' : ''
              }`}
            />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default FlagItem;
