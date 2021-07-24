import Pair from 'domain/model/pair/Pair';

export default interface PairRepositoryInterface {
    find(id: string): Promise<void>;
    findAll(): Promise<void>;
    save(user: Pair): Promise<void>;
    update(user: void): Promise<void>;
    delete(id: string): Promise<void>;
}