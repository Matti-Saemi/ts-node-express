import { ApiType, ExpressServer } from '../library/express-server';
import { 
    Express, Request,
} from 'express';
import * as request from 'supertest';

describe('ExpressServer', () => {
    const expressServer = new ExpressServer();
    let app: any;
    let server: any;
    const PORT = 2000;
    beforeAll(async () => {
        app = await expressServer.setup();
        server = expressServer.startListening(PORT);
    });

    test("It should be able to setup the exress app on a given port and return server", async () => {
        expect(app as Express).toBeTruthy();
    });

    test("It should be able to mount middleware after setup", async () => {
        expressServer.mountMiddleware((req, res, next) => {
            expect(req as Request).toBeTruthy();
            next();
        });
    });

    test("It should be able to mount GET API", async () => {
        expressServer.mountApiRoute("/test", "GET", (req, res) => {
            expect(req as Request).toBeTruthy();
        })
    });
    test("It should be able to mount POST API", async () => {
        expressServer.mountApiRoute("/test", "POST", (req, res) => {
            expect(req as Request).toBeTruthy();
        })
    });
    test("It should be able to mount PUT API", async () => {
        expressServer.mountApiRoute("/test", "PUT", (req, res) => {
            expect(req as Request).toBeTruthy();
        })
    });
    test("It should be able to mount DELETE API", async () => {
        expressServer.mountApiRoute("/test", "DELETE", (req, res) => {
            expect(req as Request).toBeTruthy();
        })
    });
    
    test("It should fail on mounting a wrong API type", async () => {
        try {
            expressServer.mountApiRoute("/test", "RANDOM" as ApiType, (req, res) => {});
        } catch(err) {
            expect(err instanceof TypeError).toBeTruthy();
        }
    });

    test("It should be able to mounte NotFound", async () => {
        expressServer.mountNotFound((req, res) => {
            expect(req as Request).toBeTruthy();
        });
    });

    test("It should response the GET method", () => {
        expressServer.mountApiRoute("/", "GET", (req, res) => {
            res.status(200).send("Teams api service ...");
        });
        
       request(app)
        .get("/").then(res => {
            expect(res.status).toBe(200);
        });
    });

    afterAll(async () => {
        expressServer.kill();
    });
});