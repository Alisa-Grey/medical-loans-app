import { PlaidTokenActionsEnum } from '../actions/plaidToken';
import { IPlaidTokenState, PlaidTokenActions } from '../types';

const initialState: IPlaidTokenState = {
  linkToken: '',
  plaidConnected: false,
  error: '',
};

function plaidTokenReducer(
  state = initialState,
  action: PlaidTokenActions
): IPlaidTokenState {
  switch (action.type) {
    case PlaidTokenActionsEnum.GENERATE_TOKEN: {
      return { ...state };
    }
    case PlaidTokenActionsEnum.GENERATE_TOKEN_SUCCESS: {
      return { ...state, linkToken: action.payload };
    }
    case PlaidTokenActionsEnum.GENERATE_TOKEN_FAIL: {
      return { ...state, error: action.payload };
    }
    case PlaidTokenActionsEnum.EXCHANGE_TOKEN_SUCCESS: {
      return { ...state, plaidConnected: action.payload, error: '' };
    }
    case PlaidTokenActionsEnum.EXCHANGE_TOKEN_FAIL: {
      return { ...state, plaidConnected: false, error: action.payload };
    }
    default:
      return state;
  }
}

export default plaidTokenReducer;
