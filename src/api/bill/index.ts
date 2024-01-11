import { api } from '@/api/util';

/**
 * 查询账单概要数据
 * @param params 参数，时间，作废标识
 * @returns {Promise<AxiosResponse<any>>}
 */
const getSummaryList = (params: any) => {
    return api.post('/bill/getSummaryList', params)
}

const getSum = (params: any) => {
    return api.post('/bill/getSum', params)
}

const getBillLine = (params: any) => {
    return api.post('/bill/getBillLine', params)
}

const updateBill = (params: any) => {
    return api.post('/bill/updateBill', params)
}

export const billApi = {
    getBillList: (params: any) => api.post('/bill/getBillList', params),
    saveBillList: (params: any) => api.post('/bill/saveBillList', params),
    getTypeList: (params: any) => api.post('/bill/getTypeList', params),
    invalidateBill: (params: any) => api.post('/bill/invalidateBill', params),
    validateBill: (params: any) => api.post('/bill/validateBill', params),
    deleteBill: (params: any) => api.post('/bill/deleteBill', params),
    getBillSum: (params: any) => api.post('/bill/getBillSum', params),
    getSummaryList,
    getSum,
    getBillLine,
    updateBill
}
