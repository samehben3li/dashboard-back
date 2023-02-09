import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { ICategory } from '../../interfaces';
import InputFile from './InputFile';

interface IPropsFields {
  setState: Dispatch<SetStateAction<ICategory>>;
  state: ICategory;
  id: string;
}

function Fields({ setState, state, id }: IPropsFields) {
  const { t } = useTranslation();
  return (
    <>
      <div className="field">
        <span>{t('riskCategory.NAME')} : </span>
        <input
          type="text"
          name="name"
          onChange={e => setState({ ...state, name: e.target.value })}
          value={state.name}
          placeholder={`${t('riskCategory.NAME')}`}
        />
      </div>
      <div className="field">
        <span>{t('riskCategory.IMAGE')} : </span>
        <InputFile
          id={id}
          onChange={e =>
            setState({
              ...state,
              img: e.target.files && e.target.files[0],
            })
          }
          ref={undefined}
        >
          {state.img || state.imgUrl ? (
            <img
              src={state.img ? URL.createObjectURL(state.img) : state.imgUrl}
              alt="risk category"
              className="img-upload"
            />
          ) : (
            <i className="fa-regular fa-image upload-icon" />
          )}
        </InputFile>
      </div>
    </>
  );
}

export default Fields;
