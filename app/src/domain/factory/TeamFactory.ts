import Team from 'domain/model/team/Team';
import TeamId from 'domain/model/team/TeamId';
import TeamName from 'domain/model/team/TeamName';
import PairId from 'domain/model/pair/PairId';
import UserId from "domain/model/user/UserId";
import TeamFactoryInterface from "domain/factory/TeamFactoryInterface";

export default class TeamFactory implements TeamFactoryInterface {
    public create(team: Team): Team {
        return team;
    }

    public update(team: Team): Team {
        return team;
    }
}