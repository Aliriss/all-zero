import { api } from '../util';
export const billApi = {
    getElectBill: (params: any) => api.post('/bill/getElectBill', params)
}
