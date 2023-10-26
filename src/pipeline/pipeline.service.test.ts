import { runPipeline } from './pipeline.service';

it('runPipeline', async () => {
    return runPipeline()
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            throw error;
        });
});
