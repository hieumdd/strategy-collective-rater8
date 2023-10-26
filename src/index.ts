import { logger } from './logging.service';
import { runPipeline } from './pipeline/pipeline.service';

['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
        logger.info({ action: 'interupt' });
        process.exit(0);
    });
});

(async () => {
    logger.info({ fn: 'index', status: 'start' });
    await runPipeline()
        .then(() => logger.info({ fn: 'index', status: 'done' }))
        .catch((error) => logger.error({ fn: 'index', status: 'error', error }));
})();
