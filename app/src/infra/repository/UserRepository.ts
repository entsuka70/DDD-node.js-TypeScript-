import { PrismaClient } from '@prisma/client';
import User from 'domain/entity/users/user/index';
import BelongsValueObject from 'domain/valueobject/belongs/index';
import UsersRepositoryInterface from "domain/repository/users/UsersRepositoryInterface";

export default class UserRepository implements UsersRepositoryInterface {
    private prisma: PrismaClient
    
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async find(user_id: number): Promise<object> {
        const user = await this.prisma.user.findFirst({
            where: {
                id: user_id
            },
        });
        if (user == null) {
            throw new Error(`Not Found User(user_id : ${user_id}).`)
        }
        return user;
    }

    public async findAll(): Promise<User[]> {
        const all_users = await this.prisma.user.findMany({
            include: {
                belong: true
            },
        });
        const entities: User[] = all_users.map(
            (model): User => {
                return new User(
                    model.id, model.user_name, model.email, new BelongsValueObject(model.belong.belong)
                )
            }
        )
        return entities;
    }

    public async findById(user_id: number): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                belong: true
            }
        });
        if (user == null) {
            throw new Error(`Not Found User(user_id : ${user_id}).`)
        }
        const entity = new User(user.id, user.user_name, user.email, new BelongsValueObject(user.belong.belong));
        return entity;
    }

    public async create(data: {pair_id:number|null, user_name:string, email:string, belong_id:number|null}): Promise<void> {
        await this.prisma.user.create({
            data: {
                pair_id: data.pair_id  ?? 1,
                user_name: data.user_name,
                email: data.email,
                belong_id: data.belong_id ?? 1,
            }
        });
        return;
    }

    public async update(data: {id: number, pair_id: number, user_name: string, email: string, belong_id: number}): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: data.id,
            },
            data: {
                pair_id: data.pair_id,
                user_name: data.user_name,
                email: data.email,
                belong_id: data.belong_id,
                updated_at: new Date(),
            }
        });
        return;
    }

    public async delete(user_id: number): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: user_id
            }
        });
        return;
    }
    
}