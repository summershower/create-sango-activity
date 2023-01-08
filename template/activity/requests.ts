import { simpleRequest } from '@/api/http';

const API = {
    GET_INDEX_DATA: '',
};

export const getIndexData = simpleRequest(API.GET_INDEX_DATA, 'get', null);