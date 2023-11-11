export type Practice = {
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
