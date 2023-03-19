import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../../actions/alert';
import { ResetPasswordActionsEnum } from '../../actions/resetPassword';
import {
  IResetPassword,
  IResponseGenerator,
  ReturnSagaType,
} from '../../types';

const resetPassword = function* ({
  payload,
  token,
  email,
  actionHistory,
}: IResetPassword): ReturnSagaType<
  ResetPasswordActionsEnum,
  IResponseGenerator
> {
  try {
    let response = yield fetch(
      `${process.env.REACT_APP_API_URL}/api/reset-password/${token}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ password: payload.password, email: email }),
      }
    ).then(async (response) => {
      const resData = await response.json();
      if (!response.ok) {
        const error = resData.message || response.status;
        return Promise.reject(error);
      }
      return resData;
    });
    yield put({
      type: ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD_SUCCESS,
      payload: response,
      actionHistory: actionHistory('/login'),
    });
    localStorage.removeItem('emailTemp');
  } catch (error: any) {
    if (error.message) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: { message: error.message, severity: 'error' },
      });
    }
    yield put({
      type: ResetPasswordActionsEnum.RESET_PASSWORD_FAIL,
      error: error,
    });
  }
};

const watchResetPassword = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(ResetPasswordActionsEnum.RESET_PASSWORD, resetPassword);
};

export default watchResetPassword;
