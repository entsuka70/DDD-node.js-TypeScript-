import { PrismaClient } from '@prisma/client';
import Issue, { IssueProps } from 'domain/model/issue/Issue';
import IssueId from 'domain/model/issue/IssueId';
import IssueNo from 'domain/model/issue/IssueNo';
import IssueName from 'domain/model/issue/IssueName';
import IssueGroup from 'domain/model/issue/IssueGroup';
import IssueRepositoryInterface from 'domain/model/issue/IssueRepositoryInterface';

export default class IssueRepository implements IssueRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async find(id: string): Promise<Issue> {
    const issue = await this.prisma.issue.findFirst({
      where: {
        id: id,
      },
    });
    if (issue == null) {
      throw new Error('Not found issue.');
    }

    const props: IssueProps = {
      id: new IssueId(issue.id),
      issue_no: new IssueNo(issue.issue_no),
      issue_name: new IssueName(issue.issue_name),
      issue_group: new IssueGroup(issue.issue_group),
    };
    return new Issue(props);
  }

  public async findAll(): Promise<Issue[]> {
    const issues = await this.prisma.issue.findMany();

    if (issues == null) {
      throw new Error('Not found issues.');
    }

    const all_issue: Issue[] = issues.map((issue) => {
      const prop: IssueProps = {
        id: new IssueId(issue.id),
        issue_no: new IssueNo(issue.issue_no),
        issue_name: new IssueName(issue.issue_name),
        issue_group: new IssueGroup(issue.issue_group),
      };
      return new Issue(prop);
    });

    return all_issue;
  }

  public async create(issue: Issue): Promise<void> {
    const { id, issue_no, issue_name, issue_group } = issue.getAllProperties();

    await this.prisma.issue.create({
      data: {
        id: id,
        issue_no: issue_no,
        issue_name: issue_name,
        issue_group: issue_group,
      },
    });
    return;
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.issue.delete({
      where: {
        id: id,
      },
    });
    return;
  }
}
