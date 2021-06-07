import { PrismaClient } from '@prisma/client';
import User from 'domain/entity/users/user/index';
import BelongsValueObject from 'domain/valueobject/belongs/index';
import UserRepositoryInterface from "domain/repository/users/UserRepositoryInterface";
import UserFactory from 'infra/factory/users/user/UserFactory';

export default class UserRepository implements UserRepositoryInterface {
    private prisma: PrismaClient
    
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async findByUserId(user_id: number): Promise<object> {
        const aggregation = await this.prisma.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                belong: true,
                pair: {
                    include: {
                        team: true
                    }
                }
            }
        });
        if (aggregation == null) {
            throw new Error(`Not Found User(user_id : ${user_id}).`)
        }
        return aggregation;
    }

    // 要修正
    public async findAll(): Promise<User[]> {
        const all_users = await this.prisma.user.findMany({
            include: {
                belong: true
            },
        });
        const entities: User[] = all_users.map(
            (model): User => {
                return new User( 
                    { id: model.id, user_name: model.user_name, email: model.email, belong_id: model.belong.belong, pair_id: model.pair_id }
                )
            }
        )
        return entities;
    }

    public async findUserAll(): Promise<object[]> {
        const all_users = await this.prisma.user.findMany({
            include: {
                belong: true
            },
        });
        return all_users;
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
        const entity = new User(
            { id: user.id, user_name: user.user_name, email: user.email, belong_id: user.belong.belong, pair_id: user.pair_id }
        );
        // const entity = new User(user.id, user.user_name, user.email, new BelongsValueObject(user.belong.belong).getBelongs());
        return entity;
    }

    public async create(data: {user_name: string, email: string, belongs: number|null}): Promise<void> {
        await this.prisma.user.create({
            data: {
                user_name: data.user_name,
                email: data.email,
                belong_id: data.belongs ?? 1,
            }
        });
        return;
    }

    public async update(entity: {pair_id:number, user_name: string, email:string, belongs: number} , data: {id: number, pair_id: number|null, user_name: string|null, email: string|null, belongs: number|null}): Promise<void> {
        let content = await this.prisma.user.update({
            where: {
                id: data.id,
            },
            data: {
                pair_id: data.pair_id ?? entity.pair_id,
                user_name: data.user_name ?? entity.user_name,
                email: data.email ?? entity.email,
                belong_id: data.belongs ?? entity.belongs,
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