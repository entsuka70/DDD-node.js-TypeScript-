import { PrismaClient } from '@prisma/client';

import TeamRepositoryInterface from "domain/model/team/TeamRepositoryInterface";
import Team, { TeamProps } from 'domain/model/team/Team';
import TeamId from 'domain/model/team/TeamId';
import TeamName from 'domain/model/team/TeamName';
import PairId from 'domain/model/pair/PairId';
import UserId from 'domain/model/user/UserId';

export default class TeamRepository implements TeamRepositoryInterface {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async find(id: string): Promise<Team> {
        const team = await this.prisma.team.findFirst({
            where: {
                id: id
            },
            include: {
                user: true,
                pair: true
            }
        });
        if (team == null) {
            throw new Error(`Not found the Team team_id: ${id}.`)
        }

        const props: TeamProps = {
            id: new TeamId(team.id),
            team_name: new TeamName(team.team_name),
            pair_ids: team.pair.map((p) => new PairId(p.id)),
            user_ids: team.user.map((u) => new UserId(u.id))
        }

        return new Team(props);
    }

    public async findAll(): Promise<Team[]> {
        const all_teams = await this.prisma.team.findMany({
            include: {
                user: true,
                pair: true,
            }
        });

        if (all_teams == null) {
            throw new Error(`Not Found any Teams.`)
        }

        const teams = all_teams.map((team) => {
            const props: TeamProps = {
                id: new TeamId(team.id),
                team_name: new TeamName(team.team_name),
                pair_ids: team.pair.map((p) => new PairId(p.id)),
                user_ids: team.user.map((u) => new UserId(u.id))
            };
            return new Team(props);
        });
        return teams;
    }

    public async save(team: Team): Promise<void> {

    }

    public async update(team: Team): Promise<void> {

    }

    public async delete(id: string): Promise<void> {

    }

}