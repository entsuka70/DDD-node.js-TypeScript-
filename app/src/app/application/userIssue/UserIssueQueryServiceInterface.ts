import UserIssueGetCommand from "./UserIssueGetCommand";
import UserIssueListDto from "./UserIssueListDto";
import UserListDto from "./UserListDto";

export default interface UserIssueQueryServiceInterface {
    find(command: UserIssueGetCommand): Promise<UserIssueListDto[]>
    findUsers(command: UserIssueGetCommand): Promise<UserListDto[]>
}