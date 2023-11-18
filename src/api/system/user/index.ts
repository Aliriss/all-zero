import { api } from '../../util';


/**
 * 查询用户
 * @param params params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getUserList = (params: any) => api.post('/user/list', params);
/**
 * 添加用户
 * @param params params
 * @returns {Promise<axios.AxiosResponse<any>>} -
 */
const addUser = (params: any) => api.post('/user/add', params);
/**
 * 修改用户
 * @param params params
 * @returns {Promise<axios.AxiosResponse<any>>} -
 */
const modify = (params: any) => api.post('/user/modify', params);
/**
 * 删除用户
 * @param params params
 * @returns {Promise<axios.AxiosResponse<any>>} -
 */
const removeUser = (params: any) => api.post('/user/remove', params);
/**
 * 禁用用户
 * @param params params
 * @returns {Promise<axios.AxiosResponse<any>>} -
 */
const disable = (params: any) => api.post('/user/disable', params);

/**
 * 启用用户
 * @param params params
 * @returns {Promise<axios.AxiosResponse<any>>} -
 */
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
