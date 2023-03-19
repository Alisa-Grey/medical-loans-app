import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';
import watchSignIn from './auth';
import watchRememberDevice from './codeVerification/rememberDevice';
import watchSendCode from './codeVerification/sendCode';
import watchVerifyCode from './codeVerification/verify';
import watchGetLoan from './loan';
import watchLogout from './logout';
import watchChangePassword from './password';
import watchSetPaymentMethod from './paymentMethod';
import watchExchangeToken from './plaid/exchangeToken';
import watchGenerateToken from './plaid/linkToken';
import watchUpdateProfile from './profile';
import watchRegister from './register';
import watchCheckLink from './resetPassword/checkLink';
import watchResetPassword from './resetPassword/passwordReset';
import watchRequireNewPassword from './resetPassword/requirePasswordReset';
import watchAddSsn from './ssn';
import watchGetUser from './user';
import watchGetTila from './tila';

const rootSaga = function* (): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([
    fork(watchSignIn),
    fork(watchRememberDevice),
    fork(watchSendCode),
    fork(watchVerifyCode),
    fork(watchRegister),
    fork(watchAddSsn),
    fork(watchGetUser),
    fork(watchLogout),
    fork(watchUpdateProfile),
    fork(watchChangePassword),
    fork(watchGetLoan),
    fork(watchGenerateToken),
    fork(watchExchangeToken),
    fork(watchRequireNewPassword),
    fork(watchResetPassword),
    fork(watchCheckLink),
    fork(watchSetPaymentMethod),
    fork(watchGetTila),
  ]);
};

export default rootSaga;
