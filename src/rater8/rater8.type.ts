export type Permission = {
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
