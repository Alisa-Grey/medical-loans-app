import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../../actions/alert';
import { AuthActionsEnum } from '../../actions/auth';
import {
  IResponseGenerator,
  ISignInResponse,
  IVerifyCode,
  ReturnSagaType,
} from '../../types';

const verifyCode = function* ({
  payload,
}: IVerifyCode): ReturnSagaType<AuthActionsEnum, ISignInResponse> {
  try {
    let response: IResponseGenerator = yield fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/client-verify-code`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          accessToken: payload.accessToken,
          code: payload.code,
        }),
      }
    ).then(async (response) => {
      let resData = await response.json();
      if (!response.ok) {
        const error = resData.error || response.status;
        return Promise.reject(error);
      } else {
        localStorage.removeItem('tempEmail');
        localStorage.setItem('token', resData.token);
        if (resData.SSN !== null) {
          localStorage.setItem('hasSSN', 'true');
        }
        return resData;
      }
    });
    yield put({
      type: AuthActionsEnum.VERIFY_CODE_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: AuthActionsEnum.VERIFY_CODE_FAIL,
      payload: error,
    });
    if (error.message) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: {
          message: error.message,
          severity: 'error',
        },
      });
    }
  }
};

const watchVerifyCode = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(AuthActionsEnum.VERIFY_CODE, verifyCode);
};

export default watchVerifyCode;
