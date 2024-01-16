import { api } from '../../util';

/**
 * 登录
 * @param params {accountId, password}
 */
const signIn = (params: any) => {
  return api.post('/account/signIn', params);
};

/**
 * 注册
 * @param params {accountId, password}
 */
const signUp = (params: any) => {
  return api.post('/account/signUp', params);
};

export const accountApi = {
  signIn,
  signUp
};