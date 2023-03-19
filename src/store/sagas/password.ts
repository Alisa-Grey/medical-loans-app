import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../actions/alert';
import { SsnActionsEnum } from '../actions/ssn';
import { UserActionsEnum } from '../actions/user';
import { IChangePassword, IResponseGenerator, ReturnSagaType } from '../types';

const changePassword = function* (
  data: IChangePassword
): ReturnSagaType<SsnActionsEnum, IResponseGenerator> {
  const { repeat_password, ...dataWithoutRepeatPsswrd } = data.payload;
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    if (token) {
      headers.append('Authorization', token);
    }

    let resData: IResponseGenerator = yield fetch(
      `${process.env.REACT_APP_API_URL}/api/profile/security`,
      {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
          current_password: dataWithoutRepeatPsswrd.current_password,
          new_password: dataWithoutRepeatPsswrd.new_password,
        }),
      }
    ).then(async (response) => {
      let resData = await response.json();

      if (!response.ok) {
        const errors = resData.errors || response.status;
        return Promise.reject(errors);
      }
      return resData;
    });

    yield put({
      type: UserActionsEnum.CHANGE_PASSWORD_SUCCESS,
      payload: resData.message,
    });
    yield put({
      type: AlertActionsEnum.SHOW_ALERT,
      payload: {
        message: resData.message,
        severity: 'success',
      },
    });
  } catch (errors: any) {
    if (errors.message) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: {
          message: errors.message,
          severity: 'error',
        },
      });
    }
    yield put({
      type: UserActionsEnum.CHANGE_PASSWORD_FAIL,
      errors: errors,
    });
  }
};

const watchChangePassword = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(UserActionsEnum.CHANGE_PASSWORD, changePassword);
};

export default watchChangePassword;
