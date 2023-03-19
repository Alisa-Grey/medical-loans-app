import { AlertActionsEnum } from '../actions/alert';
import { AlertActions, IAlertState } from '../types';

const initialState: IAlertState = {
  isOpened: false,
  message: '',
  severity: undefined,
};

export default function alertReducer(
  state = initialState,
  action: AlertActions
): IAlertState {
  switch (action.type) {
    case AlertActionsEnum.SHOW_ALERT: {
      return {
        ...state,
        isOpened: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    }
    case AlertActionsEnum.HIDE_ALERT: {
      return {
        ...state,
        isOpened: false,
        message: '',
        severity: undefined,
      };
    }
    default:
      return state;
  }
}
