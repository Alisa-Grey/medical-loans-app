import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../../actions/alert';
import { ResetPasswordActionsEnum } from '../../actions/resetPassword';
import {
  IRequireNewPassword,
  IResponseGenerator,
  ReturnSagaType,
} from '../../types';

const requireNewPassword = function* (
  data: IRequireNewPassword
): ReturnSagaType<ResetPasswordActionsEnum, IResponseGenerator> {
  try {
    let response = yield fetch(
      `${process.env.REACT_APP_API_URL}/api/reset-password/require`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          email: data.payload,
        }),
      }
    ).then(async (response) => {
      let resData = await response.json();
      if (!response.ok) {
        const error = resData.message || response.status;
        return Promise.reject(error);
      }
      return resData;
    });

    yield put({
      type: ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD_SUCCESS,
      payload: response.message,
    });
    localStorage.setItem('emailTemp', data.payload);
  } catch (error: any) {
    if (error.message) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: { message: error.message, severity: 'error' },
      });
    } else {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: { message: error, severity: 'error' },
      });
    }
    yield put({
      type: ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD_FAIL,
      error: error,
    });
  }
};

const watchRequireNewPassword = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(
    ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD,
    requireNewPassword
  );
};

export default watchRequireNewPassword;
