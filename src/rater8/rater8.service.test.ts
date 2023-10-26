import { getPermissions } from './rater8.service';

it('getPermissions', async () => {
    return getPermissions()
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            throw error;
        });
});
