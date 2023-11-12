import { api } from '../util';


/**
 * 查询用户
 * @param params params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getUserList = (params: any) => api.post('/user/list', params);
const addUser = (params: any) => api.post('/user/add', params);
const modify = (params: any) => api.post('/user/modify', params);
const removeUser = (params: any) => api.post('/user/remove', params);
const disable = (params: any) => api.post('/user/disable', params);
const enable = (params: any) => api.post('/user/enable', params);

/**
 * 用户api
 * @type {{getUserList: (params: any) => Promise<AxiosResponse<any>>}}
 */
export const userApi: any = {
    getUserList,
    addUser,
    removeUser,
    disable,
    enable,
    modify
}
