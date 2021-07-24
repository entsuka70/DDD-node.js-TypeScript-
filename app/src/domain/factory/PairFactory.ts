import Pair from "domain/model/pair/Pair";
import PairFactoryInterface from "domain/factory/PairFactoryInterface";
import { PrismaClient } from '@prisma/client';
import PairDomainService from "domain/domainservice/PairDomainService";

export default class PairFactory implements PairFactoryInterface {

    private readonly pairDomainService: PairDomainService;

    constructor(pairDomainService: PairDomainService) {
        this.pairDomainService = pairDomainService;
    }

    public async create(data: { pair_name: string, belong: boolean, team_id: string }): Promise<object> {
        return data;
    }

    public async updatePair(pairEntity: void): Promise<void> {

        return;
    }

}

// 重複するオブジェクトを除外する
function filterDuplicatedObject<T extends dtoProperty>(dtos: T[]): T[] {
    const dtoIds = dtos.map((dto) => {
        return dto.id;
    });
    const filterd: T[] = dtos.filter((dto: T, index: number) => {
        return dtoIds.indexOf(dto.id) === index;
    });
    return filterd;
}

interface dtoProperty {
    id: number | undefined;
}