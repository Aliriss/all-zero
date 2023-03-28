import { api } from '@/api/util';

/**
 * 查询消费类型
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getTypeList =  (params: any) => api.post('/bill/getTypeList', params);


export const expTypeApi = {
    getTypeList
}