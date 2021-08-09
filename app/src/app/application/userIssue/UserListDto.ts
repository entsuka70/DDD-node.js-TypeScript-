import UserId from "domain/model/user/UserId";
import UserIssue from "domain/model/userissue/UserIssue";

type Props = {
    user_id: UserId
}

export default class UserIssueDto {
    public readonly user_id: string;

    constructor(props: Props) {
        const { user_id } = props;
        this.user_id = user_id.get();
    }
}