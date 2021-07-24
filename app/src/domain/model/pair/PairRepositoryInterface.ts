import Pair from 'domain/model/pair/Pair';

export default interface PairRepositoryInterface {
    find(id: string): Promise<Pair>;
    findAll(): Promise<Pair[]>;
    save(user: Pair): Promise<void>;
    update(pair: Pair): Promise<void>;
    delete(id: string): Promise<void>;
}