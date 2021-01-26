import { NextFunction, Request, Response } from 'express';
import { TeamsHandler as TeamsHandler } from './controllers/teams-handler';
import { ExpressServer } from './library/express-server';
import * as  bodyParser from 'body-parser';

export class ApiServer {
    public static PORT = process.env.PORT || 3000;
    public static async start() {
        const expressServer = new ExpressServer();
        await expressServer.setup();
        expressServer.startListening(this.PORT);

        this.handleExit(expressServer);
        this.configureRoutes(expressServer);

        return expressServer;
    }

    private static configureRoutes(expressServer: ExpressServer) {
        expressServer
            .mountMiddleware(bodyParser.json())
            .mountMiddleware(bodyParser.urlencoded({ extended: false }))
            .mountMiddleware(this.handleMiddlewares)
            .mountApiRoute("/", "GET", this.handleIndex)
            .mountApiRoute("/teams/:team_name", "GET", TeamsHandler.handleFindTeam)
            .mountApiRoute("/teams", "GET", TeamsHandler.handleGetAllTeams)
            .mountApiRoute("/teams", "POST", TeamsHandler.handlePostTeam)
            .mountNotFound(this.handleNotFound);
    }

    private static handleMiddlewares(req: Request, res: Response, next: NextFunction) {
        console.info(`INFO: Request: ${req.method} ${req.url}`);
        next();
    }

    private static handleIndex(req: Request, res: Response) {
        res.status(200).send("Teams api service ...");
    }

    private static handleNotFound(req: Request, res: Response) {
        res.status(404).send("Sorry, we are unable to find the requested route!");
    }

    private static handleExit(express: ExpressServer) {
        process.on('uncaughtException', (err: Error) => {
            console.error('Uncaught exception', err);
            this.shutdownProperly(1, express);
        })
        process.on('unhandledRejection', (reason: {} | null | undefined) => {
            console.error('Unhandled Rejection at promise', reason);
            this.shutdownProperly(2, express);
        })
        process.on('exit', () => {
            console.info('Exiting');
        })
    }

    private static shutdownProperly(
        exitCode: number, express: ExpressServer) {
        Promise.resolve()
            .then(() => express.kill())
            .then(() => {
                console.info('Shutdown complete');
                process.exit(exitCode);
            })
            .catch(err => {
                console.error('Error during shutdown', err);
                process.exit(1);
            });
    }
}