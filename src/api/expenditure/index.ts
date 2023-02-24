import { api } from '../util';
export const expenditureApi = {
    getExpenditureList: (params: any) => api.post('/expenditure/getExpenditureList', params)
}
