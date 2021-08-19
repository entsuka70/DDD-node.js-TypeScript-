import { PrismaClient } from '@prisma/client';

import TeamRepositoryInterface from 'domain/model/team/TeamRepositoryInterface';
import Team, { TeamProps } from 'domain/model/team/Team';
import TeamId from 'domain/model/team/TeamId';
import TeamName from 'domain/model/team/TeamName';
import PairId from 'domain/model/pair/PairId';
import UserId from 'domain/model/user/UserId';

export default class TeamRepository implements TeamRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async find(id: string): Promise<Team> {
    const team = await this.prisma.team.findFirst({
      where: {
        id: id,
      },
      include: {
        pair: {
          where: {
            team_id: id,
          },
        },
        user: {
          where: {
            team_id: id,
          },
        },
      },
    });
    if (team == null) {
      throw new Error(`Not found the Team team_id: ${id}.`);
    }

    const props: TeamProps = {
      id: new TeamId(team.id),
      team_name: new TeamName(team.team_name),
      pair_ids: team.pair.map((p) => new PairId(p.id)),
      user_ids: team.user.map((u) => new UserId(u.id)),
    };

    return new Team(props);
  }

  public async findAll(): Promise<Team[]> {
    const all_teams = await this.prisma.team.findMany({
      include: {
        user: true,
        pair: true,
      },
    });

    if (all_teams == null) {
      throw new Error(`Not Found any Teams.`);
    }

    const teams = all_teams.map((team) => {
      const props: TeamProps = {
        id: new TeamId(team.id),
        team_name: new TeamName(team.team_name),
        pair_ids: team.pair.map((p) => new PairId(p.id)),
        user_ids: team.user.map((u) => new UserId(u.id)),
      };
      return new Team(props);
    });
    return teams;
  }

  public async findMinUser(): Promise<Team> {
    const teams = await this.prisma.team.findMany({
      include: {
        _count: {
          select: {
            user: true,
          },
        },
        user: true,
        pair: true,
      },
    });
    // ユーザー数3名以上のチームを抽出
    const minUserTeams = teams.filter(
      (team) =>
        team._count &&
        team._count.user >= Team.MIN_TEAM_USER &&
        team.id !== TeamId.DEFAULT_TEAM_ID
    );
    if (!minUserTeams || !minUserTeams.length) {
      // ※※※ 自動的にユーザー数3人以上のチームを作成する処理が必要 ※※※
      throw new Error('There is not exist Team which has min user');
    }

    // ランダム(適当)に最小ユーザー数チームを抽出
    const props: TeamProps = {
      id: new TeamId(minUserTeams[0].id),
      team_name: new TeamName(minUserTeams[0].team_name),
      pair_ids: minUserTeams[0].pair.map((p) => new PairId(p.id)),
      user_ids: minUserTeams[0].user.map((u) => new UserId(u.id)),
    };

    return new Team(props);
  }

  public async update(team: Team): Promise<void> {
    await this.prisma.team.update({
      where: {
        id: team.getId(),
      },
      data: {
        team_name: team.getTeamName(),
      },
    });

    // ペアIDから更新する際は、紐付くユーザーも一緒にチーム移動
    // ユーザーIDから更新する際は、、、①ユーザーのみチームに移動でペアはそのまま②ユーザーに紐付くペアもチームに移動し、他のペアに紐付くユーザーもチームに移動
    const relationPairs = await this.prisma.pair.findMany({
      where: {
        user: {
          some: {
            pair_id: {
              in: team.getPairIds(),
            },
          },
        },
      },
    });

    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            id: {
              in: team.getUserIds(),
            },
          },
          {
            pair_id: {
              in: team.getPairIds(),
            },
          },
          {
            pair_id: {
              in: relationPairs.map((relation) => relation.id),
            },
          },
        ],
      },
    });

    const pairs = await this.prisma.pair.findMany({
      where: {
        OR: [
          {
            id: {
              in: team.getPairIds(),
            },
          },
          {
            user: {
              some: {
                pair_id: {
                  in: team.getPairIds(),
                },
              },
            },
          },
        ],
      },
    });

    await this.prisma.pair.updateMany({
      where: {
        id: {
          in: pairs.map((pair) => pair.id),
        },
      },
      data: {
        team_id: team.getId(),
      },
    });
    await this.prisma.user.updateMany({
      where: {
        id: {
          in: users.map((user) => user.id),
        },
      },
      data: {
        team_id: team.getId(),
      },
    });
  }
}
