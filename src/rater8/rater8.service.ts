import axios from 'axios';

import { Practice } from './rater8.type';

const client = axios.create({
    baseURL: 'https://rapi.rater8.com/api',
    auth: { username: <string>process.env.RATER8_USERNAME, password: <string>process.env.RATER8_PASSWORD },
    headers: { 'Content-Type': 'application/json' },
});

export const getPractices = async () => {
    return await client.request<Practice[]>({ method: 'GET', url: '/permissions' }).then((response) => response.data);
};

type GetReviewsByLocationOptions = { practiceId: number; locationId: number };

export const getReviewsByLocation = async ({ practiceId, locationId }: GetReviewsByLocationOptions) => {
    return await client
        .request<object[]>({
            method: 'GET',
            url: `/reviews/practice/${practiceId}/location/${locationId}`,
        })
        .then((response) => response.data ?? []);
};

type GetReviewsByEmployeeOptions = { practiceId: number; employeeId: number };

export const getReviewsByEmployee = async ({ practiceId, employeeId }: GetReviewsByEmployeeOptions) => {
    return await client
        .request<object[]>({
            method: 'GET',
            url: `/reviews/practice/${practiceId}/employee/${employeeId}`,
        })
        .then((response) => response.data ?? []);
};
