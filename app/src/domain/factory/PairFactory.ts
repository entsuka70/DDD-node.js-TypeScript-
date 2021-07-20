import User from "domain/entity/users/user/user";
import Pair from "domain/entity/users/pair/index";
import Team from "domain/entity/users/team/index";
import PairFactoryInterface from "domain/factory/PairFactoryInterface";
import UserDto from "app/dto/UserDto";
import PairDto from "app/dto/PairDto";
import TeamDto from "app/dto/TeamDto";
import BelongsValueObject from "domain/valueobject/belongs";
import { PrismaClient } from '@prisma/client';
import PairDomainService from "domain/domainservice/PairDomainService";

export default class PairFactory implements PairFactoryInterface {

    private readonly pairDomainService: PairDomainService;

    constructor(pairDomainService: PairDomainService) {
        this.pairDomainService = pairDomainService;
    }

    // NOTE:ペアに関わるCRUDはペア集約で考えることが正しそうなので不要
    public async updatePair(data: { id: number, pair_name: string, teams_id: number }, pairEntity: Pair): Promise<Pair> {
        const teamIns = new Team({
            id: pairEntity.getAllProperties().team.getAllProperties().id,
            team_name: pairEntity.getAllProperties().team.getAllProperties().team_name,
        });
        const pair = new Pair({
            id: data.id,
            teams_id: data.teams_id ?? pairEntity.getAllProperties().teams_id,
            pair_name: data.pair_name ?? pairEntity.getAllProperties().pair_name,
            team: teamIns,
            user_id: pairEntity.getAllProperties().user_id,
        });

        return pair;
    }

    public async createPairAll(pairAggregations: Pair[]): Promise<PairDto[]> {

        const pairsDtos: PairDto[] = await pairAggregations.map((pair) => {
            return new PairDto(pair);
        });

        // NOTE:重複ペアの削除
        const pairsDtoAll = filterDuplicatedObject(pairsDtos);
        return pairsDtoAll;
    }

    // NOTE:チームに関わるCRUDはチーム集約で考えることが正しそうなので不要
    public async createTeamAll(userAggregations: User[]): Promise<TeamDto[]> {
        const teams = await userAggregations.map(userAggregation => userAggregation.getAllProperties().pair.getAllProperties().team);

        const teamDtos: TeamDto[] = await teams.map(team => {
            return new TeamDto(team);
        })

        // NOTE:重複チームの削除
        const teamsDtoAll = filterDuplicatedObject(teamDtos);
        return teamsDtoAll;
    }
}

// 重複するオブジェクトを除外する
function filterDuplicatedObject<T extends dtoProperty>(dtos: T[]): T[] {
    const dtoIds = dtos.map((dto) => {
        return dto.id;
    });
    const filterd: T[] = dtos.filter((dto: T, index: number) => {
        return dtoIds.indexOf(dto.id) === index;
    });
    return filterd;
}

interface dtoProperty {
    id: number | undefined;
}