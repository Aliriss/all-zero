import { api } from '@/api/util';

/**
 * 查询账单概要数据
 * @param params 参数，时间，作废标识
 * @returns {Promise<AxiosResponse<any>>}
 */
const getList = (params: any) => {
    return api.post('/deposit/list', params)
}


export const depositApi = {
    getList
}
