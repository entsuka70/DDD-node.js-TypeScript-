import { PrismaClient } from '@prisma/client';
import UserId from 'domain/model/user/UserId';
import IssueId from 'domain/model/issue/IssueId';
import UserIssueProgress from 'domain/model/userissue/UserIssueProgress';
import UserIssueQueryServiceInterface from 'app/application/userIssue/UserIssueQueryServiceInterface';
import UserIssueListDto from 'app/application/userIssue/UserIssueListDto';
import UserListDto from 'app/application/userIssue/UserListDto';
import UserIssueGetCommand from 'app/application/userIssue/UserIssueGetCommand';
import IssueName from 'domain/model/issue/IssueName';
import UserName from 'domain/model/user/UserName';
import UserStatus from 'domain/model/user/UserStatus';
import IssueNo from 'domain/model/issue/IssueNo';
import IssueGroup from 'domain/model/issue/IssueGroup';

// QueryServiceの利用により複数感集約をまたいでの参照・DTO返却までを行う
export default class UserIssueQueryService implements UserIssueQueryServiceInterface {
    private prisma: PrismaClient

    static DEFAULT_PAGINATION = 10;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async find(command: UserIssueGetCommand): Promise<UserIssueListDto[]> {
        const searchRule = this.setQueryRule(command);

        const userIssueLists = await this.prisma.userIssue.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        user_name: true,
                        status: true,
                    }
                },
                issue: {
                    select: {
                        id: true,
                        issue_no: true,
                        issue_group: true,
                        issue_name: true,
                    }
                }
            },
            where: searchRule,
            skip: command.list_no && command.list ? Number(command.list) * Number(command.list_no) : undefined,
            take: command.list ? Number(command.list) : UserIssueQueryService.DEFAULT_PAGINATION,
            orderBy: {
                issue_id: 'asc',
            }
        });

        if (userIssueLists == null) {
            throw new Error('Not found userIssues.')
        }

        const allUserIssue = userIssueLists.map((userIssueList) => {
            const prop = {
                user_id: new UserId(userIssueList.user_id),
                user_name: new UserName(userIssueList.user.user_name),
                status: new UserStatus(userIssueList.user.status),
                issue_id: new IssueId(userIssueList.issue_id),
                issue_no: new IssueNo(userIssueList.issue.issue_no),
                issue_name: new IssueName(userIssueList.issue.issue_name),
                issue_group: new IssueGroup(userIssueList.issue.issue_group),
                progress: new UserIssueProgress(userIssueList.progress)
            }
            return new UserIssueListDto(prop);
        });

        return allUserIssue;
    }

    public async findUsers(command: UserIssueGetCommand): Promise<UserListDto[]> {
        const searchRule = this.setQueryRule(command);

        const userIssueLists = await this.prisma.userIssue.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        user_name: true,
                        status: true,
                    }
                },
                issue: {
                    select: {
                        id: true,
                        issue_no: true,
                        issue_group: true,
                        issue_name: true,
                    }
                }
            },
            where: searchRule,
            skip: command.list_no && command.list ? Number(command.list) * Number(command.list_no) : undefined,
            take: command.list ? Number(command.list) : UserIssueQueryService.DEFAULT_PAGINATION,
            orderBy: {
                issue_id: 'asc',
            }
        });

        if (userIssueLists == null) {
            throw new Error('Not found userIssues.')
        }

        const allUsers = userIssueLists.map((userIssueList) => {
            const prop = {
                user_id: new UserId(userIssueList.user.id),
            }
            return new UserListDto(prop);
        });

        return this.filterDuplicatedObject(allUsers);
    }

    // クエリwhereによる検索条件をまとめる
    public setQueryRule(command: UserIssueGetCommand) {
        // 動的にオブジェクトが形成されるためここだけany
        let searchRule: any = { issue: {}, user: {} };

        command.user_id ? searchRule.user_id = command.user_id : searchRule;
        command.issue_id ? searchRule.issue_id = command.issue_id : searchRule;
        command.progress ? searchRule.progress = Number(command.progress) : searchRule;
        command.issue_no ? searchRule.issue.issue_no = Number(command.issue_no) : searchRule;
        command.issue_name ? searchRule.issue.issue_name = command.issue_name : searchRule;
        command.issue_group ? searchRule.issue.issue_group = Number(command.issue_group) : searchRule;
        command.user_name ? searchRule.user.user_name = command.user_name : searchRule;
        command.status ? searchRule.user.staus = command.status : searchRule;
        if (0 === Object.keys(searchRule.issue).length) {
            delete searchRule.issue;
        }
        if (0 === Object.keys(searchRule.user).length) {
            delete searchRule.user;
        }
        return searchRule;
    }

    // 重複するオブジェクトを除外する
    public filterDuplicatedObject(dtos: UserListDto[]): UserListDto[] {
        const dtoIds = dtos.map((dto) => {
            return dto.user_id;
        });
        const filterd = dtos.filter((dto, index) => {
            return dtoIds.indexOf(dto.user_id) === index;
        });
        return filterd;
    }
}