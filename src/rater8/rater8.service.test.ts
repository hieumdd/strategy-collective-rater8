import { getPermissions, getReviews } from './rater8.service';

it('getPermissions', async () => {
    return getPermissions()
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            throw error;
        });
});

it('getReviews', async () => {
    return getReviews({ practiceId: 290, locationId: 1519 })
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            throw error;
        });
});