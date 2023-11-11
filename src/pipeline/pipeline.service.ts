import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import ndjson from 'ndjson';
import pMap from 'p-map';

import { logger } from '../logging.service';
import { LoadConfig, createLoadStream } from '../bigquery.service';
import { getPractices, getReviewsByEmployee, getReviewsByLocation } from '../rater8/rater8.service';
import * as pipelines from './pipeline.const';
import { Practice } from '../rater8/rater8.type';

export const runPipeline = async () => {
    const practices = await getPractices();

    const practicePipeline = pipeline(
        Readable.from(practices),
        ndjson.stringify(),
        createLoadStream(pipelines.Practice),
    );

    const createReviewPipeline = async <T>(
        paramsFn: (practices: Practice[]) => T[],
        get: (params: T) => Promise<object[]>,
        loadConfig: LoadConfig,
    ) => {
        const reviewStream = new Readable({ objectMode: true, read: () => {} });

        pMap(
            paramsFn(practices),
            async (params) => {
                logger.debug({ fn: 'runPipeline', params });
                return await get(params).then((reviews) => reviews.forEach((review) => reviewStream.push(review)));
            },
            { concurrency: 20 },
        )
            .then(() => reviewStream.push(null))
            .catch((error) => {
                logger.error({ fn: 'runPipeline', error });
                reviewStream.emit('error', error);
            });

        return pipeline(reviewStream, ndjson.stringify(), createLoadStream(loadConfig));
    };

    const reviewByLocationPipeline = createReviewPipeline(
        (practices) =>
            practices.flatMap((practice) => {
                return practice.locations.map((location) => ({ practiceId: practice.id, locationId: location.id }));
            }),
        getReviewsByLocation,
        pipelines.LocationReview,
    );
    const reviewByEmployeePipeline = createReviewPipeline(
        (practices) =>
            practices.flatMap((practice) => {
                return practice.employees.map((employee) => ({ practiceId: practice.id, employeeId: employee.id }));
            }),
        getReviewsByEmployee,
        pipelines.EmployeeReview,
    );

    return Promise.all([practicePipeline, reviewByLocationPipeline, reviewByEmployeePipeline]).then(() => true);
};
