import { Team, Teams } from '../models/team';

describe('Teams', () => {
    test("It should get all the teams", () => {
      Teams.getAll().then(teams => {
        expect(teams.length).not.toEqual(0);
      })
    });

    test("It should get a specific team", () => {
      const teamName = "Arsenal";
      Teams.get(teamName).then((team: Team | null) => {
        expect(team as Team).toBeTruthy();
      })
    });
    test("The querried team should not be null", () => {
      const teamName = "Arsenal";
      Teams.get(teamName).then((team: Team | null) => {
        expect(team).not.toBe(null);
      })
    });
    test("The querried team should contains the original name", () => {
      const teamName = "Arsenal";
      Teams.get(teamName).then((team: Team | null) => {
        expect(team).toMatchObject({ "name" : teamName});
      })
    });


    test("It store a new team", async () => {
      const hockeyTeam = { 
        "name": "Canucks", 
        "img" : "https://upload.wikimedia.org/wikipedia/en/3/3a/Vancouver_Canucks_logo.svg"
      } as Team;

      await Teams.store(hockeyTeam);
      Teams.get(hockeyTeam.name).then(team => {
        expect(team).toEqual(hockeyTeam);
      })
    });

});