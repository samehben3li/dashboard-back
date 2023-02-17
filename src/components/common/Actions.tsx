import React from 'react';
import Button from './Buttons/Button';

interface IPropsActions {
  updateAction: () => void;
  deleteAction: () => void;
}

interface IPropsButton {
  className: string;
  onClick: () => void;
  iconClassName: string;
}

function ButtonAction({ iconClassName, onClick, className }: IPropsButton) {
  return (
    <td>
      <Button
        isSubmit={false}
        className={className}
        disabled={false}
        onClick={onClick}
      >
        <i className={iconClassName} />
      </Button>
    </td>
  );
}

function Actions({ updateAction, deleteAction }: IPropsActions) {
  return (
    <>
      <ButtonAction
        className="icon-container update"
        onClick={updateAction}
        iconClassName="fa-solid fa-pen-to-square icon icon-update"
      />
      <ButtonAction
        className="icon-container delete"
        onClick={deleteAction}
        iconClassName="fa-sharp fa-solid fa-trash icon icon-delete"
      />
    </>
  );
}

export default Actions;
