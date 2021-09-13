import Team from './Team';

export default interface TeamRepositoryInterface {
  find(id: string): Promise<Team>;
  findAll(): Promise<Team[]>;
  findMinUser(): Promise<Team>;
  update(team: Team): Promise<void>;
}
