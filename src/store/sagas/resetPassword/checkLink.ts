import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { ResetPasswordActionsEnum } from '../../actions/resetPassword';
import { ICheckLink, IResponseGenerator, ReturnSagaType } from '../../types';

const checkLink = function* ({
  token,
  email,
}: ICheckLink): ReturnSagaType<ResetPasswordActionsEnum, IResponseGenerator> {
  try {
    let response = yield fetch(
      `${process.env.REACT_APP_API_URL}/api/reset-password/${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ email: email }),
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
      type: ResetPasswordActionsEnum.CHECK_LINK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({ type: ResetPasswordActionsEnum.CHECK_LINK_FAIL, error: error });
  }
};

const watchCheckLink = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(ResetPasswordActionsEnum.CHECK_LINK, checkLink);
};

export default watchCheckLink;
