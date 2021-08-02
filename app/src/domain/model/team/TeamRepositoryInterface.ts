import Team from 'domain/model/team/Team';

export default interface TeamRepositoryInterface {
    find(id: string): Promise<Team>;
    findAll(): Promise<Team[]>;
    findMinUser(): Promise<Team>;
    save(team: Team): Promise<void>;
    update(team: Team): Promise<void>;
    delete(id: string): Promise<void>;
}