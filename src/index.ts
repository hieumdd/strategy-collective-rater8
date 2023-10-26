import { logger } from './logging.service';
import { runPipeline } from './pipeline/pipeline.service';

['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
        logger.info({ action: 'interupt' });
        process.exit(0);
    });
});

(async () => {
    await runPipeline();
})();
