import { takeEvery } from '@redux-saga/core/effects';
import { ForkEffect } from 'redux-saga/effects';
import { AuthActionsEnum } from '../actions/auth';
import { IResponseGenerator, ReturnSagaType } from '../types';

const logout = function* (): ReturnSagaType<
  AuthActionsEnum,
  IResponseGenerator
> {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('hasSSN');
  yield localStorage.removeItem('accessToken');
};

const watchLogout = function* (): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(AuthActionsEnum.LOG_OUT, logout);
};

export default watchLogout;
