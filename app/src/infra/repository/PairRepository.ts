import { PrismaClient } from '@prisma/client';

import PairRepositoryInterface from "domain/model/pair/PairRepositoryInterface";
import Pair from 'domain/model/pair/Pair';

export default class PairRepository implements PairRepositoryInterface {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async find(id: string): Promise<void> {

    }

    public async findAll(): Promise<void> {

    }

    public async save(user: Pair): Promise<void> {

    }

    public async update(user: void): Promise<void> {

    }

    public async delete(id: string): Promise<void> {

    }

}