import { ApiServer } from './api-server'
import { formatError } from './tools/error-utils';

ApiServer.start()
    .then(() => {
        console.info(`The API server is running on port ${ApiServer.PORT}...`);
    }).catch(err => {
        console.error("ERROR: Error starting server", formatError(err.stack));
    });