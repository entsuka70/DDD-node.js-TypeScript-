import User from "domain/model/user/User";
import UserId from 'domain/model/user/UserId';
import UserName from 'domain/model/user/UserName';
import UserEmail from 'domain/model/user/UserEmail';
import UserStatus from 'domain/model/user/UserStatus';
import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserFactoryInterface from "domain/factory/UserFactoryInterface";
import UserCreateCommand from "app/application/user/UserCreateCommand";

export default class UserFactory implements UserFactoryInterface {

    public async create(data: {
        pair_id: string, team_id: string, status: number, user_name: string, email: string,
    }): Promise<User> {

        const props = {
            id: new UserId(),
            pair_id: new PairId(data.pair_id),
            team_id: new TeamId(data.team_id),
            status: new UserStatus(data.status),
            user_name: new UserName(data.user_name),
            email: new UserEmail(data.email)
        }
        return new User(props);
    }

    public async update(command: UserCreateCommand, user: User): Promise<User> {
        const { id, pair_id, team_id, status, user_name, email } = user.getAllProperties();
        const props = {
            id: new UserId(command.id),
            pair_id: command.pair_id ? new PairId(command.pair_id) : new PairId(pair_id),
            team_id: command.team_id ? new TeamId(command.team_id) : new TeamId(team_id),
            status: command.status ? new UserStatus(command.status) : new UserStatus(status),
            user_name: command.user_name ? new UserName(command.user_name) : new UserName(user_name),
            email: command.email ? new UserEmail(command.email) : new UserEmail(email)
        }
        return new User(props);
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