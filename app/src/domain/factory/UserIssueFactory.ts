import User from "domain/model/user/User";
import UserIssueFactoryInterface from "domain/factory/UserIssueFactoryInterface";
import UserIssueCommand from "app/application/userIssue/UserIssueCreateCommand";

export default class UserIssueFactory implements UserIssueFactoryInterface {
    // TODO: User集約の引数のままなのでIssue集約へ修正する
    public create(issue: object): any {
        return;
    }
    public updateIssue(issue: object): any {
        return;
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