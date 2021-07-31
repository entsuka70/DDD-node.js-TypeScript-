import Team from "domain/model/team/Team"

export default interface PairFactoryInterface {
    create(team: Team): Team;
    update(team: Team): Team;
}