import { api } from '../util';
export const billApi = {
    getBillList: (params: any) => api.post('/bill/getBillList', params)
}
