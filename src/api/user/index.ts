import { api } from '../util';
export const userApi = {
    getUserList: (params: any) => api.post('/user/getUserList', params)
}
