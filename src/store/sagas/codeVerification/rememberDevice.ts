import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../../actions/alert';
import { AuthActionsEnum } from '../../actions/auth';
import {
  IRememberDevice,
  IResponseGenerator,
  ReturnSagaType,
} from '../../types';

const rememberDevice = function* ({
  payload,
}: IRememberDevice): ReturnSagaType<AuthActionsEnum, IResponseGenerator> {
  try {
    yield fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/client-remember-device`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
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
  } catch (error: any) {
    yield put({
      type: AuthActionsEnum.REMEMBER_DEVICE_FAIL,
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

const watchRememberDevice = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(AuthActionsEnum.REMEMBER_DEVICE, rememberDevice);
};

export default watchRememberDevice;
