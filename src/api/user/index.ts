import { api } from '../util';



const getUserList = (params: any) => api.post('/user/getUserList', params);

/**
 * 用户api
 * @type {{getUserList: (params: any) => Promise<AxiosResponse<any>>}}
 */
export const userApi = {
    getUserList
}
