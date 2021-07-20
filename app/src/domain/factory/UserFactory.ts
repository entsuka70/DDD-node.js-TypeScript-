import User from "domain/entity/users/user/user";
import Pair from "domain/entity/users/pair/index";
import Team from "domain/entity/users/team/index";
import UserFactoryInterface from "domain/factory/UserFactoryInterface";
import UserDto from "app/dto/UserDto";
import PairDto from "app/dto/PairDto";
import TeamDto from "app/dto/TeamDto";
import BelongsValueObject from "domain/valueobject/belongs";
import { PrismaClient } from '@prisma/client';
import UserDomainService from "domain/domainservice/UserDomainService";

export default class UserFactory implements UserFactoryInterface {

    private readonly userDomainService: UserDomainService;

    constructor(userDomainService: UserDomainService) {
        this.userDomainService = userDomainService;
    }

    public async createUserAll(userAggregations: User[]): Promise<UserDto[]> {
        const users = await userAggregations.map(
            (userAggregation): UserDto => {
                return new UserDto(userAggregation);
            }
        )
        return users;
    }

    public async createUser(data: {
        pair_id: number, belong_id: number, user_name: string, email: string,
    }): Promise<User> {

        const teamIns = new Team({
            id: undefined,
            team_name: Team.TEAM_NAME_NO_BELONG,
        });

        const pairIns = new Pair({
            id: data.pair_id,
            teams_id: Pair.DEFAULT_NO_TEAM_ID,
            pair_name: Pair.PAIR_NAME_NO_BELONG,
            team: teamIns,
            user_id: [], // NOTE:本来は複数入るが、Userエンティティに関わる処理を全体的に見直し必要なので一旦保留
        })

        const belongObject = {
            id: BelongsValueObject.DEFAULT_BLONGS_ID,
            belong: BelongsValueObject.BELONGS,
        };
        const belongIns = new BelongsValueObject(belongObject);

        const user = new User({
            id: undefined,
            pair_id: data.pair_id ?? Pair.DEFAULT_NO_PAIR_ID,
            belong_id: BelongsValueObject.DEFAULT_BLONGS_ID,
            user_name: data.user_name,
            email: data.email,
            belong: belongIns,
            pair: pairIns,
        });

        return user;
    }

    public async updateUser(data: { id: number, user_name: string, email: string, pair_id: number, belong_id: number }, userEntity: User, pairData: User, belongEntity: BelongsValueObject): Promise<User> {
        const teamIns = new Team({
            id: userEntity.getAllProperties().pair.getAllProperties().teams_id,
            team_name: userEntity.getAllProperties().pair.getAllProperties().team.getAllProperties().team_name,
        });

        // pair および teamは別集約での更新処理とするので、データ変更は考慮しない
        // 集約整合性の観点ではpair_idと整合性が無くなる可能性があるが、影響範囲が大きいので一旦保留
        let user_ids: number[] = [];
        if (data.pair_id) {
            user_ids = pairData.getAllProperties().pair.getAllProperties().user_id;
            user_ids.push(data.id);
        }

        const pairIns = new Pair({
            id: data.pair_id ?? userEntity.getAllProperties().pair.getAllProperties().id,
            teams_id: pairData.getAllProperties().pair.getAllProperties().teams_id ?? userEntity.getAllProperties().pair.getAllProperties().teams_id,
            pair_name: pairData.getAllProperties().pair.getAllProperties().pair_name ?? userEntity.getAllProperties().pair.getAllProperties().pair_name,
            team: teamIns,
            user_id: data.pair_id ? user_ids : userEntity.getAllProperties().pair.getAllProperties().user_id // NOTE:本来は複数入るが、Userエンティティに関わる処理を全体的に見直し必要なので一旦保留
        });

        const belongObject = {
            id: belongEntity.getAllProperties().id ?? userEntity.getAllProperties().belong_id,
            belong: belongEntity.getAllProperties().belong ?? userEntity.getAllProperties().belong.getAllProperties().belong,
        };
        const belongIns = new BelongsValueObject(belongObject);

        let user = new User({
            id: data.id,
            pair_id: data.pair_id ?? userEntity.getAllProperties().pair_id,
            belong_id: data.belong_id ?? userEntity.getAllProperties().belong_id,
            user_name: data.user_name ?? userEntity.getAllProperties().user_name,
            email: data.email ?? userEntity.getAllProperties().email,
            belong: belongIns,
            pair: pairIns,
        });

        return user;
    }

    // NOTE:ペアに関わるCRUDはペア集約で考えることが正しそうなので不要
    public async updatePair(data: { id: number, pair_name: string, teams_id: number }, userPairEntity: User, teamData: User): Promise<User> {
        const teamIns = new Team({
            id: teamData.getAllProperties().pair.getAllProperties().team.getAllProperties().id,
            team_name: teamData.getAllProperties().pair.getAllProperties().team.getAllProperties().team_name,
        });
        const pairIns = new Pair({
            id: data.id,
            teams_id: teamData.getAllProperties().pair.getAllProperties().team.getAllProperties().id ?? userPairEntity.getAllProperties().pair.getAllProperties().teams_id,
            pair_name: data.pair_name ?? userPairEntity.getAllProperties().pair.getAllProperties().pair_name,
            team: teamIns,
            user_id: [data.id],
        });
        const belongObject = {
            id: userPairEntity.getAllProperties().belong.getAllProperties().id,
            belong: userPairEntity.getAllProperties().belong.getAllProperties().belong,
        };
        const belongIns = new BelongsValueObject(belongObject);
        const user = new User({
            id: userPairEntity.getAllProperties().id,
            pair_id: userPairEntity.getAllProperties().pair_id,
            belong_id: userPairEntity.getAllProperties().belong_id,
            user_name: userPairEntity.getAllProperties().user_name,
            email: userPairEntity.getAllProperties().email,
            belong: belongIns,
            pair: pairIns
        });
        return user;
    }

    // NOTE:ペアに関わるCRUDはペア集約で考えることが正しそうなので不要
    // Userが参加しているペアをすべて返す
    public async createPairAll(userAggregations: User[]): Promise<PairDto[]> {
        const pairs: Pair[] = await userAggregations.map(userAggregation => userAggregation.getAllProperties().pair);

        const pairsDtos: PairDto[] = await pairs.map((pair) => {
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