import { PrismaClient } from '@prisma/client';
import User from 'domain/model/user/User';
import BelongsValueObject from 'domain/valueobject/belongs/index';
import IssueRepositoryInterface from "domain/model/issue/IssueRepositoryInterface";
import IssueFactory from 'domain/factory/IssueFactory';
import Pair from 'domain/model/pair';
import Team from 'domain/model/team';

export default class IssueRepository implements IssueRepositoryInterface {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async findByIssueId(user_id: number): Promise<void> {
        return;
    }

    public async findAll(): Promise<void> {
        return;
    }

    public async create(user: User): Promise<void> {
        return;
    }

    public async update(user: void): Promise<void> {
        return;
    }

    public async delete(user_id: number): Promise<void> {
        return;
    }

}