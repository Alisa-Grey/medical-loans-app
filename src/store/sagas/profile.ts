import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../actions/alert';
import { UserActionsEnum } from '../actions/user';
import { IResponseGenerator, IUpdate, ReturnSagaType } from '../types';

const updateProfile = function* ({
  data,
}: IUpdate): ReturnSagaType<UserActionsEnum, IResponseGenerator> {
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    if (token) {
      headers.append('Authorization', token);
    }

    let resData: IResponseGenerator = yield fetch(
      `${process.env.REACT_APP_API_URL}/api/profile`,
      {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data),
      }
    ).then(async (response) => {
      let resData = await response.json();

      if (!response.ok) {
        const errors = resData.errors || response.status;
        return Promise.reject(errors);
      }
      return resData;
    });
    yield put({ type: UserActionsEnum.UPDATE_DATA_SUCCESS, payload: resData });
  } catch (error: any) {
    if (error.message) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: { message: error.message, severity: 'error' },
      });
    }
    yield put({ type: UserActionsEnum.UPDATE_DATA_FAIL, payload: error });
  }
};

const watchUpdateProfile = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(UserActionsEnum.UPDATE_DATA, updateProfile);
};

export default watchUpdateProfile;
