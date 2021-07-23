import Pair from "domain/model/pair/index"

export default interface PairFactoryInterface {
    create(user: object): Promise<object>;
    updatePair(pair: void): Promise<void>;
}