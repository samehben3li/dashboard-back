import React from 'react';
import { IFlag, ILocation } from '../interfaces';

interface IProps {
  flag: IFlag;
  index: number;
}

interface IPropsItem {
  name: string;
  imgUrl: string;
}

interface IPropsLocationSide {
  side: string[];
}

const positions: string[] = ['TOP', 'MIDDLE', 'BOTTOM'];

function FlagItemContainer({ name, imgUrl }: IPropsItem) {
  return (
    <td>
      <div className="flag-item-container">
        <img src={imgUrl} alt="flag" />
        <span>{name}</span>
      </div>
    </td>
  );
}

function LocationSide({ side }: IPropsLocationSide) {
  return (
    <div className="location-side">
      {positions.map(p => (
        <div
          key={p}
          className={`location-piece ${side?.includes(p) ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}

function Location({ left, right }: ILocation) {
  return (
    <td>
      <div className="location-container">
        <LocationSide side={left} />
        <LocationSide side={right} />
      </div>
    </td>
  );
}

function FlagItem({ flag, index }: IProps) {
  return (
    <tr>
      <td>
        <span>{index + 1}</span>
      </td>
      <FlagItemContainer
        name={flag?.riskCategory?.name}
        imgUrl={flag?.riskCategory?.imgUrl}
      />
      <FlagItemContainer
        name={flag?.riskCategoryType?.name}
        imgUrl={flag?.riskCategoryType?.imgUrl}
      />
      <FlagItemContainer
        name={flag?.plantPart?.name}
        imgUrl={flag?.plantPart?.imgUrl}
      />
      <Location left={flag?.location.left} right={flag?.location.right} />
    </tr>
  );
}

export default FlagItem;
