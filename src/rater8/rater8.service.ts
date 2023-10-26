import axios from 'axios';

const client = axios.create({
    baseURL: 'https://rapi.rater8.com/api',
    auth: { username: <string>process.env.RATER8_USERNAME, password: <string>process.env.RATER8_PASSWORD },
    headers: { 'Content-Type': 'application/json' },
});

export const getPractices = async () => {
    type Practice = {
        id: number;
        name: string;
        employees: {
            id: number;
            name: string;
            clientCodes: string[];
        }[];
        locations: {
            id: number;
            name: string;
            clientCodes: string[];
        }[];
    };

    return client.request<Practice[]>({ method: 'GET', url: '/permissions' }).then((response) => response.data);
};

type GetReviewsOptions = { practiceId: number; locationId: number };

export const getReviews = async ({ practiceId, locationId }: GetReviewsOptions) => {
    return client
        .request<object[]>({
            method: 'GET',
            url: `/reviews/practice/${practiceId}/location/${locationId}`,
        })
        .then((response) => response.data);
};
