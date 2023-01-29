import { IAction, IState } from '../interfaces';

const appReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case '':
      return state;
    default:
      return state;
  }
};

export default appReducer;
