import * as path from 'path';
import * as FileUtils from '../tools/file-utils';

export interface Team {
    name: string;
    img: string;
}

const FOOTBALL_FILE = "football-new.json";

export class Teams {
    public static async get(key: string): Promise<Team | null> {
        const teams = await this.getAll();
        return teams.find(team => 
            team.name.trim().toLocaleLowerCase() 
                === key.trim().toLocaleLowerCase()) 
                || null;
    }

    public static getAll(): Promise<Team[]> {
        return this.queryAllTeams();
    }

    public static store(newTeam: Team): Promise<void> {
        return this.get(newTeam.name).then(existingTeam => {
            if (!existingTeam) {
                return this.addNewTeam(newTeam);
            } else {
                return this.editTeamInfo(newTeam);
            }
        });
    }

    private static queryAllTeams(): Promise<Team[]> {
        return new Promise((resolve, reject) => 
            FileUtils.readFromFile(
                path.resolve(__dirname, FOOTBALL_FILE), 
                (err, buffer) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(JSON.parse(buffer) as Team[]);
                })
        );
    }

    private static addNewTeam(newTeam: Team) {
        return this.queryAllTeams().then(allTeams => {
            allTeams.push(newTeam);
            FileUtils.writeToFile(path.resolve(__dirname, FOOTBALL_FILE), allTeams);
        });
    }

    private static editTeamInfo(newTeamInfo: Team) {
        return this.queryAllTeams().then(allTeams => {
            const newTeams = allTeams.map(team => {
                if(team.name === newTeamInfo.name) {
                    return newTeamInfo;
                }
                return team;
            });
            
            FileUtils.writeToFile(path.resolve(__dirname, FOOTBALL_FILE), newTeams);
        });
    }

}
