import { getPractices, getReviewsByLocation, getReviewsByEmployee } from './rater8.service';

it('getPermissions', async () => {
    return getPractices()
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            throw error;
        });
});

it('getReviewsByLocation', async () => {
    return getReviewsByLocation({ practiceId: 290, locationId: 1519 })
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            throw error;
        });
});

it('getReviewsByEmployee', async () => {
    return getReviewsByEmployee({ practiceId: 290, employeeId: 6157 })
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            throw error;
        });
});
