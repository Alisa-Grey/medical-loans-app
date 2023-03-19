import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../actions/alert';
import { RegActionsEnum } from '../actions/register';
import { IRegister, IResponseGenerator, ReturnSagaType } from '../types';

const register = function* ({
  data,
  actionHistory,
}: IRegister): ReturnSagaType<RegActionsEnum, IResponseGenerator> {
  const { repeat_password, ...dataWithoutRepeatPsswrd } = data;
  const userData = new FormData();

  Object.keys(dataWithoutRepeatPsswrd).forEach((key) => {
    if (key !== 'medical_bill') {
      userData.append(key, dataWithoutRepeatPsswrd[key]);
    } else {
      return;
    }
  });
  userData.append('medical_bill', dataWithoutRepeatPsswrd['medical_bill']);

  try {
    let response: IResponseGenerator = yield fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      {
        method: 'POST',
        body: userData,
      }
    ).then(async (response) => {
      let resData = await response.json();

      if (!response.ok) {
        const errors = resData.errors || response.status;
        return Promise.reject(errors);
      } else {
        const token = resData.token;

        if (token) {
          localStorage.setItem('token', token);
        }
      }
      return resData;
    });
    localStorage.setItem('hasSSN', 'false');
    yield put({
      type: RegActionsEnum.REGISTER_RESULT,
      payload: response,
      actionHistory: actionHistory('/ssn'),
    });
  } catch (errors: any) {
    yield put({
      type: RegActionsEnum.REGISTER_FAIL,
      payload: errors,
    });
    if (errors.message) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: { message: 'Network error', severity: 'error' },
      });
    }
  }
};

const watchRegister = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(RegActionsEnum.REGISTER_REQUEST, register);
};

export default watchRegister;
