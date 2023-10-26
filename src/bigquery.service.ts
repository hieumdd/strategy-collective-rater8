import { BigQuery, TableSchema } from '@google-cloud/bigquery';

import { logger } from './logging.service';

const client = new BigQuery();

const DATASET = 'Rater8';

export type LoadConfig = {
    table: string;
    schema: Record<string, any>[];
};

export const createLoadStream = ({ table, schema }: LoadConfig) => {
    return client
        .dataset(DATASET)
        .table(table)
        .createWriteStream({
            schema: { fields: schema } as TableSchema,
            sourceFormat: 'NEWLINE_DELIMITED_JSON',
            createDisposition: 'CREATE_IF_NEEDED',
            writeDisposition: 'WRITE_TRUNCATE',
        })
        .on('job', () => logger.debug({ fn: 'load', table }));
};
