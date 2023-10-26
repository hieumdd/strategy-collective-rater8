import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import ndjson from 'ndjson';

import { logger } from '../logging.service';
import { createLoadStream } from '../bigquery.service';
import { getPractices, getReviews } from '../rater8/rater8.service';
import * as pipelines from './pipeline.const';

export const runPipeline = async () => {
    const practices = await getPractices();

    const practicePipeline = pipeline(
        Readable.from(practices),
        ndjson.stringify(),
        createLoadStream(pipelines.Practice),
    );

    const reviewStream = new Readable({ objectMode: true, read: () => {} });

    const reviewPipeline = pipeline(reviewStream, ndjson.stringify(), createLoadStream(pipelines.Review));

    Promise.all(
        practices.flatMap((practice) => {
            return practice.locations.map(async (location) => {
                return getReviews({
                    practiceId: practice.id,
                    locationId: location.id,
                }).then((reviews) => {
                    (reviews || []).forEach((review) => reviewStream.push(review));
                });
            });
        }),
    )
        .then(() => reviewStream.push(null))
        .catch((error) => {
            logger.error({ fn: 'runPipeline', error });
            reviewStream.emit('error', error);
        });

    return Promise.all([practicePipeline, reviewPipeline]).then(() => true);
};
