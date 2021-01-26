import * as express from 'express';
import { 
    Express,
    Request, 
    Response, 
    NextFunction 
} from 'express';
import { Server } from 'http';

export type ApiType = "GET" | "POST" | "PUT" | "DELETE";

export class ExpressServer {
    private app?: Express;
    private httpServer?: Server;

    public async setup() {
        this.app = express();
        this.app.disable('x-powered-by');
        return this.app;
    }

    public startListening(port: number | string) {
        if(!this.app) {
            throw Error("Server should be setup before listening to a port");
        } 
        this.httpServer = this.app.listen(this.normalizePortValue(port));
        return this.httpServer;
    }

    public mountMiddleware(
        handler: (req: Request, res: Response, next: NextFunction) => void) {
        this.app?.use(handler);
        return this;
    }

    public mountApiRoute(
        route: string, type: ApiType, 
        handler: (req: Request, res: Response) => void) {
        switch (type) {
            case "GET" :
                this.app?.get(route, handler);
                break;
            case "POST" :
                this.app?.post(route, handler);
                break;
            case "PUT" :
                this.app?.put(route, handler);
                break;
            case "DELETE" :
                this.app?.delete(route, handler);
                break;
            default:
                throw TypeError("Wrong API type!")
        }
        return this;
    }

    public mountNotFound(handler: (req: Request, res: Response) => void) {
        this.app?.use(handler);
        return this;
    }

    public kill() {
        if (this.httpServer) {
            this.httpServer.close();
        } 
    }

    private normalizePortValue(port: number | string): number {
        return typeof port === "string" ? Number(port) : port;
    }
}