import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { AlertActionsEnum } from '../actions/alert';
import { AuthActionsEnum } from '../actions/auth';
import { IResponseGenerator, ISignIn, IUser, ReturnSagaType } from '../types';

const signIn = function* ({
  userData,
  actionHistory,
}: ISignIn): ReturnSagaType<AuthActionsEnum, IResponseGenerator> {
  try {
    const fpPromise = FingerprintJS.load();

    const data = yield fpPromise;
    const result = yield data.get();

    localStorage.setItem('access-token', result.visitorId);
    const accessToken = localStorage.getItem('access-token');

    let response: IResponseGenerator & {
      data: IUser | { email: string; status: string };
    } = yield fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        accessToken,
      }),
    }).then(async (response) => {
      let resData = await response.json();
      if (!response.ok) {
        const error = resData.errors || response.status;
        return Promise.reject(error);
      } else {
        if (resData.status === 'redirect') {
          localStorage.setItem('tempEmail', resData.email);
          return resData;
        }
        const token = resData.token;
        const SSN = resData.SSN;

        if (token) {
          localStorage.setItem('token', token);
        }

        if (SSN !== null) {
          localStorage.setItem('hasSSN', 'true');
        } else {
          localStorage.setItem('hasSSN', 'false');
        }
      }
      return resData;
    });

    if (response.status === 'redirect') {
      yield put({
        type: AuthActionsEnum.SIGN_IN_RESULT_REDIRECT,
        payload: response,
        actionHistory: actionHistory('/verify-code'),
      });
    } else {
      yield put({
        type: AuthActionsEnum.SIGN_IN_RESULT,
        payload: response as { data: IUser },
      });
    }
  } catch (error: any) {
    if (error === 429) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: {
          message:
            'Too many failed login attempts. Please try again in 30 minutes',
          severity: 'error',
        },
      });
    } else if (error.message) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: { message: error.message, severity: 'error' },
      });
    }

    yield put({
      type: AuthActionsEnum.SIGN_IN_FAIL,
      errors: error,
    });
  }
};

const watchSignIn = function* (): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(AuthActionsEnum.SIGN_IN_REQUEST, signIn);
};

export default watchSignIn;
