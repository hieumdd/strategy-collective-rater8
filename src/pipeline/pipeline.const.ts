import { LoadConfig } from '../bigquery.service';

export const Practice: LoadConfig = {
    table: 'Practice',
    schema: [
        { name: 'id', type: 'NUMERIC' },
        { name: 'name', type: 'STRING' },
        {
            name: 'employees',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'id', type: 'NUMERIC' },
                { name: 'name', type: 'STRING' },
                { name: 'clientCodes', type: 'STRING', mode: 'REPEATED' },
            ],
        },
        {
            name: 'locations',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'id', type: 'NUMERIC' },
                { name: 'name', type: 'STRING' },
                { name: 'clientCodes', type: 'STRING', mode: 'REPEATED' },
            ],
        },
    ],
};

export const LocationReview: LoadConfig = {
    table: 'LocationReview',
    schema: [
        { name: 'id', type: 'NUMERIC' },
        { name: 'companyId', type: 'NUMERIC' },
        { name: 'companyName', type: 'STRING' },
        { name: 'batchId', type: 'NUMERIC' },
        { name: 'ReviewMonth', type: 'STRING' },
        { name: 'ReviewDate', type: 'DATE' },
        { name: 'apptTypeCode', type: 'STRING' },
        { name: 'apptLocationCode', type: 'STRING' },
        { name: 'apptDeptCode', type: 'STRING' },
        { name: 'locationRating', type: 'NUMERIC' },
        { name: 'atLoc_rater8Id', type: 'NUMERIC' },
        { name: 'atLoc_Name', type: 'STRING' },
        { name: 'Comment', type: 'STRING' },
    ],
};

export const EmployeeReview: LoadConfig = {
    table: 'EmployeeReview',
    schema: [
        { name: 'id', type: 'NUMERIC' },
        { name: 'companyId', type: 'NUMERIC' },
        { name: 'companyName', type: 'STRING' },
        { name: 'batchId', type: 'NUMERIC' },
        { name: 'ReviewMonth', type: 'STRING' },
        { name: 'ReviewDate', type: 'DATE' },
        { name: 'apptTypeCode', type: 'STRING' },
        { name: 'apptLocationCode', type: 'STRING' },
        { name: 'apptDeptCode', type: 'STRING' },
        { name: 'employeeRating', type: 'NUMERIC' },
        { name: 'atLoc_rater8Id', type: 'NUMERIC' },
        { name: 'atLoc_Name', type: 'STRING' },
        { name: 'Comment', type: 'STRING' },
        {
            name: 'questions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'id', type: 'NUMERIC' },
                { name: 'name', type: 'STRING' },
                { name: 'rating', type: 'NUMERIC' },
                { name: 'Comment', type: 'STRING' },
            ],
        },
    ],
};
