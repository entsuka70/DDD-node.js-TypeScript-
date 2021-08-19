import Pair from 'domain/model/pair/Pair';

export default interface PairRepositoryInterface {
  find(id: string): Promise<Pair>;
  findAll(): Promise<Pair[]>;
  findMinUser(pair: Pair): Promise<Pair>;
  findByUserIds(ids: string[]): Promise<Pair[]>;
  findFree(): Promise<Pair[]>;
  update(pair: Pair): Promise<void>;
}
