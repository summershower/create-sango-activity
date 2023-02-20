import { useMock } from '@/utils/hooks';
import * as requests from './requests';
import { Random } from 'mockjs'

const mockData: Partial<Record<keyof typeof requests, Function | Object>> = {
    getIndexData: {
        'name': '@name'
    },
    getParamsData: (pageNum) => {
        return {
            'list|20': pageNum < 6 ? [{
                name: '@name',
                portrait: Random.image('200*200'),
                score: '@integer(0, 10000)',
                content: '@string(10, 50)',
                date: '@datetime',
            }] : []
        }
    },
};

export default useMock(requests, mockData);