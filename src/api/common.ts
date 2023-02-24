import { api } from '@/api/util';

export const common = {
    getUser: () => api.get('/getUser')
}
