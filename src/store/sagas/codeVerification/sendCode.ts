import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../../actions/alert';
import { AuthActionsEnum } from '../../actions/auth';
import {
  IResponseGenerator,
  ISendCodeOnEmail,
  ReturnSagaType,
} from '../../types';

const sendCodeOnEmail = function* ({
  payload,
}: ISendCodeOnEmail): ReturnSagaType<AuthActionsEnum, IResponseGenerator> {
  try {
    let response: IResponseGenerator = yield fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/client-send-code`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          email: payload.email,
          accessToken: payload.accessToken,
        }),
      }
    ).then(async (response) => {
      let resData = await response.json();
      if (!response.ok) {
        const error = resData.error || response.status;
        return Promise.reject(error);
      } else {
        return resData;
      }
    });
    yield put({
      type: AuthActionsEnum.SEND_CODE_ON_EMAIL_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
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

const watchSendCode = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(AuthActionsEnum.SEND_CODE_ON_EMAIL, sendCodeOnEmail);
};

export default watchSendCode;
