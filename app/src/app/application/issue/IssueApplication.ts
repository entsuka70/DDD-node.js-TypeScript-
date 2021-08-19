import IssueRepositoryInterface from 'domain/model/issue/IssueRepositoryInterface';
import IssueFactory from 'domain/factory/IssueFactory';
import IssueDto from './IssueDto';
import IssueCreateCommand from './IssueCreateCommand';
import UserIssueRepositoryInterface from 'domain/model/userissue/UserIssueRepositoryInterface';
import UserRepositoryInterface from 'domain/model/user/UserRepositoryInterface';
import UserIssueFactory from 'domain/factory/UserIssueFactory';
import IssueDeleteCommand from './IssueDeleteCommand';

export default class IssueApplication {
  private readonly issueRepository: IssueRepositoryInterface;
  private readonly userIssueRepository: UserIssueRepositoryInterface;
  private readonly userRepository: UserRepositoryInterface;
  private readonly issueFactory: IssueFactory;
  private readonly userIssueFactory: UserIssueFactory;

  constructor(
    issueRepository: IssueRepositoryInterface,
    userIssueRepository: UserIssueRepositoryInterface,
    userRepository: UserRepositoryInterface
  ) {
    this.issueRepository = issueRepository;
    this.userIssueRepository = userIssueRepository;
    this.userRepository = userRepository;
    this.issueFactory = new IssueFactory();
    this.userIssueFactory = new UserIssueFactory();
  }

  public async findAll() {
    try {
      const issues = await this.issueRepository.findAll();
      const issueDto = issues.map((issue) => new IssueDto(issue));
      return issueDto;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async create(command: IssueCreateCommand) {
    try {
      // 課題を作成したら各ユーザーに課題を紐付ける
      const newIssue = this.issueFactory.create(command);
      await this.issueRepository.create(newIssue);
      const users = await this.userRepository.findAll();
      const userIssuesRebuild = this.userIssueFactory.createMany(
        newIssue.getId(),
        users
      );
      await this.userIssueRepository.createMany(userIssuesRebuild);
      return;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async delete(command: IssueDeleteCommand) {
    try {
      // カスケード削除対象になるので先に外部キー参照しているUserIssueから削除
      // (Prisma公式記載SQLでテーブル変更が手間)
      await this.userIssueRepository.deletManyIssue(command.id);
      await this.issueRepository.delete(command.id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
