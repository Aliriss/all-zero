import { api } from '@/api/util';

export const common = {
    getUser: () => {
        return api.get('/getUser')
    }
}
