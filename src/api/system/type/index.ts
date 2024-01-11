import { api } from '@/api/util';

/**
 * 查询消费类型
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
const getList =  () => api.get('/type/list');
const addOne =  (params: any) => api.post('/type/add', params);
const deleteById =  (params: any) => api.delete(`/type?id=${params}`);

const modify = (params: any) => api.put('/type', params);

export const typeApi = {
    getList,
    addOne,
    deleteById,
    modify
}