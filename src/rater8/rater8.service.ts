import axios from 'axios';

import { Permission } from './rater8.type';

const client = axios.create({
    baseURL: 'https://rapi.rater8.com/api',
    auth: { username: <string>process.env.RATER8_USERNAME, password: <string>process.env.RATER8_PASSWORD },
    headers: { 'Content-Type': 'application/json' },
});

export const getPermissions = async () => {
    return client.request<Permission[]>({ method: 'GET', url: '/permissions' }).then((response) => response.data);
};
