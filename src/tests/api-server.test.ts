import { ApiServer } from '../api-server';
import { ExpressServer } from '../library/express-server';

describe('ApiServer', () => {
    let expressServer: ExpressServer;

    beforeAll(async () => {
        expressServer = await ApiServer.start();
    })

    test("It should be able to start the API server and return express server", async () => {
        expect(expressServer as ExpressServer).toBeTruthy();

    });

    afterAll(() => {
        expressServer.kill();
    })
});