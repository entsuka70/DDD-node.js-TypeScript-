import { PrismaClient } from '@prisma/client';
import User from 'domain/entity/users/user/index';
import BelongsValueObject from 'domain/valueobject/belongs/index';
import UsersRepositoryInterface from "domain/repository/users/UsersRepositoryInterface";

export default class UserRepository implements UsersRepositoryInterface {
    private prisma: PrismaClient
    
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async findAll(): Promise<User[]> {
        const all_users = await this.prisma.user.findMany({
            include: {belong: true},
        })
        console.log(all_users);

        const entity: User[] = all_users.map(
            (model): User => {
                return new User(
                    model.id, model.user_name, model.email, new BelongsValueObject(model.belong.belong)
                )
            }
        )
        return entity;
    }

    public async findById(): Promise<User> {
        return new User(1, 'test', 'test@mail', new BelongsValueObject());
    }

    public async create(): Promise<User> {
        return new User(1, 'test', 'test@mail', new BelongsValueObject());
    }

    public async update(): Promise<User> {
        return new User(1, 'test', 'test@mail', new BelongsValueObject());
    }

    public async delete(): Promise<User> {
        return new User(1, 'test', 'test@mail', new BelongsValueObject());
    }
    
}