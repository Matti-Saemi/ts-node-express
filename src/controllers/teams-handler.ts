import { Request, Response } from "express";
import { Teams } from '../models/team';
import * as ErrorUtils from '../tools/error-utils';

export class TeamsHandler {
    public static async handleFindTeam (req: Request, res: Response) {
        const teamName = req.params.team_name;
        Teams.get(teamName).then(requestedTeam => {
            if(!requestedTeam) {
                res.status(404).send("No such a team exist!");
                return;
            }
        
            res.status(200).send(requestedTeam);
        }).catch(err => {
            console.error(
                "ERROR: [teamHandler]: ", 
                ErrorUtils.formatError(err.stack));

            res.status(500).send("Something went wrong");
            return;
        });
    }

    public static async handleGetAllTeams(req: Request, res: Response) {
        Teams.getAll().then(allTemas => {
            
            if(!allTemas.length) {
                res.status(404).send("No teams were found");
                return;
            }

            res.status(200).send(allTemas);
        }).catch(err => {
            console.error(
                "ERROR: [teamHandler]: ", 
                ErrorUtils.formatError(err.stack));

            res.status(500).send("Something went wrong");
            return;
        });
    }

    public static async handlePostTeam(req: Request, res: Response) {
        const newTeam = req.body;
        Teams.store(newTeam).then(() => {
            res.status(200).send();
        }).catch(err => {
            console.error(
                "ERROR: [teamHandler]: ", 
                ErrorUtils.formatError(err.stack));

            res.status(500).send("Something went wrong");
            return;
        });
    }

}
