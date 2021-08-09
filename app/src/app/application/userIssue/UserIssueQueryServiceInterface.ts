import UserIssueGetCommand from "./UserIssueGetCommand";
import UserIssueList from "./UserIssueListDto";

export default interface UserIssueQueryServiceInterface {
    find(command: UserIssueGetCommand): Promise<UserIssueList[]>
}