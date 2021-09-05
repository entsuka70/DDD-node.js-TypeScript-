import { PrismaClient } from '@prisma/client';
import UserIssue, { UserIssueProps } from 'domain/model/userissue/UserIssue';
import UserIssueId from 'domain/model/userissue/UserIssueId';
import UserId from 'domain/model/user/UserId';
import IssueId from 'domain/model/issue/IssueId';
import UserIssueProgress from 'domain/model/userissue/UserIssueProgress';
import UserIssueRepositoryInterface from 'domain/model/userissue/UserIssueRepositoryInterface';

export default class UserIssueRepository
  implements UserIssueRepositoryInterface
{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async find(id: string): Promise<UserIssue> {
    const userIssue = await this.prisma.userIssue.findFirst({
      where: {
        id: id,
      },
    });
    if (userIssue == null) {
      throw new Error('Not found userIssue.');
    }

    const props: UserIssueProps = {
      id: new UserIssueId(userIssue.id),
      user_id: new UserId(userIssue.user_id),
      issue_id: new IssueId(userIssue.issue_id),
      progress: new UserIssueProgress(userIssue.progress),
    };
    return new UserIssue(props);
  }

  public async findAll(): Promise<UserIssue[]> {
    const userIssues = await this.prisma.userIssue.findMany();

    if (userIssues == null) {
      throw new Error('Not found userIssues.');
    }

    const allUserIssue: UserIssue[] = userIssues.map((userIssue) => {
      const prop = {
        id: new UserIssueId(userIssue.id),
        user_id: new UserId(userIssue.user_id),
        issue_id: new IssueId(userIssue.issue_id),
        progress: new UserIssueProgress(userIssue.progress),
      };
      return new UserIssue(prop);
    });

    return allUserIssue;
  }

  public async createMany(userIssues: UserIssue[]): Promise<void> {
    const datas = userIssues.map((userIssue) => {
      const data = {
        id: userIssue.getId(),
        user_id: userIssue.getUserId(),
        issue_id: userIssue.getIssueId(),
        progress: userIssue.getProgress(),
      };
      return data;
    });
    await this.prisma.userIssue.createMany({
      data: datas,
      skipDuplicates: true,
    });
    return;
  }

  public async update(userIssue: UserIssue): Promise<void> {
    const { id, progress } = userIssue.getAllProperties();
    await this.prisma.userIssue.update({
      where: {
        id: id,
      },
      data: {
        progress: progress,
      },
    });
    return;
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.userIssue.delete({
      where: {
        id: id,
      },
    });
  }

  public async deletManyIssue(id: string): Promise<void> {
    await this.prisma.userIssue.deleteMany({
      where: {
        issue_id: id,
      },
    });
    return;
  }
}
