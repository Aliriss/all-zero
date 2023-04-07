import { api } from '@/api/util';
export const billApi = {
    getBillList: (params: any) => api.post('/bill/getBillList', params),
    saveBillList: (params: any) => api.post('/bill/saveBillList', params),
    getTypeList: (params: any) => api.post('/bill/getTypeList', params),
    invalidateBill: (params: any) => api.post('/bill/invalidateBill', params),
    validateBill: (params: any) => api.post('/bill/validateBill', params),
    deleteBill: (params: any) => api.post('/bill/deleteBill', params),
    getBillSum: (params: any) => api.post('/bill/getBillSum', params)
}
