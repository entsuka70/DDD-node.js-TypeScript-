import PairCreateCommand from "app/application/pair/PairCreateCommand";
import Pair from "domain/model/pair/Pair"

export default interface PairFactoryInterface {
    create(user: object): Promise<object>;
    update(command: PairCreateCommand, pair: Pair): Promise<Pair>;
}