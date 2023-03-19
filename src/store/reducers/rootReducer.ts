import { combineReducers } from 'redux';
import authReducer from './auth';
import profileReducer from './profile';
import ssnReducer from './ssn';
import alertReducer from './alert';
import loanReducer from './loan';
import plaidTokenReducer from './plaidToken';
import resetPasswordReducer from './resetPassword';
import paymentMethodReducer from './paymentMathod';
import tilaReducer from './tila';

export const rootReducer = combineReducers({
  auth: authReducer,
  ssn: ssnReducer,
  profile: profileReducer,
  alert: alertReducer,
  loan: loanReducer,
  plaid: plaidTokenReducer,
  resetPassword: resetPasswordReducer,
  paymentMethod: paymentMethodReducer,
  tila: tilaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
