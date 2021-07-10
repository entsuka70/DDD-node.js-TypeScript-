import User from "domain/entity/users/user/index";
import Pair from "domain/entity/users/pair/index";
import Team from "domain/entity/users/team/index";
import UserFactoryInterface from "domain/factory/UserFactoryInterface";
import UserPairAggregation from "domain/factory/UserFactoryInterface";
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

    public async updateUser(data: { id: number, user_name: string, email: string }, userEntity: User, pairData: User, belongData: User): Promise<User> {
        const teamIns = new Team({
            id: pairData.getAllProperties().pair.getAllProperties().teams_id ?? userEntity.getAllProperties().pair.getAllProperties().team.getAllProperties().id,
            team_name: pairData.getAllProperties().pair.getAllProperties().pair_name ?? userEntity.getAllProperties().pair.getAllProperties().team.getAllProperties().team_name,
        });

        // idが変われば、temas_idも変わる
        const pairIns = new Pair({
            id: pairData.getAllProperties().pair_id ?? userEntity.getAllProperties().pair.getAllProperties().id,
            teams_id: pairData.getAllProperties().pair.getAllProperties().teams_id ?? userEntity.getAllProperties().pair.getAllProperties().teams_id,
            pair_name: pairData.getAllProperties().pair.getAllProperties().pair_name ?? userEntity.getAllProperties().pair.getAllProperties().pair_name,
            team: teamIns,
        })

        const belongObject = {
            id: belongData.getAllProperties().belong_id ?? userEntity.getAllProperties().belong_id,
            belong: belongData.getAllProperties().belong.getBelongs().belong ?? userEntity.getAllProperties().belong,
        };
        const belongIns = new BelongsValueObject(belongObject);

        let user = new User({
            id: data.id,
            pair_id: pairData.getAllProperties().pair_id ?? userEntity.getAllProperties().pair_id,
            belong_id: belongData.getAllProperties().belong_id ?? userEntity.getAllProperties().belong_id,
            user_name: data.user_name ?? userEntity.getAllProperties().user_name,
            email: data.email ?? userEntity.getAllProperties().email,
            belong: belongIns,
            pair: pairIns,
        });

        return user;
    }

    public async updatePair(data: { id: number, pair_name: string, teams_id: number }, userPairEntity: User, teamData: User): Promise<User> {
        const teamIns = new Team({
            id: teamData.getAllProperties().pair.getAllProperties().team.getAllProperties().id,
            team_name: teamData.getAllProperties().pair.getAllProperties().team.getAllProperties().team_name,
        });
        const pairIns = new Pair({
            id: data.id,
            teams_id: teamData.getAllProperties().pair.getAllProperties().team.getAllProperties().id ?? userPairEntity.getAllProperties().pair.getAllProperties().teams_id,
            pair_name: data.pair_name ?? userPairEntity.getAllProperties().pair.getAllProperties().pair_name,
            team: teamIns
        });
        const belongObject = {
            id: userPairEntity.getAllProperties().belong.getBelongs().id,
            belong: userPairEntity.getAllProperties().belong.getBelongs().belong,
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