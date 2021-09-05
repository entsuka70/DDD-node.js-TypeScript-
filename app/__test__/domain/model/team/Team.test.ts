import Team, { TeamProps } from 'src/domain/model/team/Team';
import TeamId from 'src/domain/model/team/TeamId';
import TeamName from 'src/domain/model/team/TeamName';
import UserId from 'src/domain/model/user/UserId';
import PairId from 'src/domain/model/pair/PairId';

describe('domain/model/team Team', () => {
  describe('正常系テスト', () => {
    // 利用するTeam初期化
    const teamId: TeamId = new TeamId();
    const teamName: TeamName = new TeamName(111);

    function makePairIds(): PairId[] {
      const ids: PairId[] = [];
      for (let i = 0; i < 4; i++) {
        ids.push(new PairId());
      }
      return ids;
    }
    function makeUserIds(): UserId[] {
      const ids: UserId[] = [];
      for (let i = 0; i < 8; i++) {
        ids.push(new UserId());
      }
      return ids;
    }

    const pairIds: PairId[] = makePairIds();
    const userIds: UserId[] = makeUserIds();
    const props: TeamProps = {
      id: teamId,
      team_name: teamName,
      pair_ids: pairIds,
      user_ids: userIds,
    };
    const team = new Team(props);

    it('Teamインスタンス初期化が正常に動作する', () => {
      expect(team).toBeDefined();
      expect.stringContaining(team.getId());
      expect(team.getId()).toMatch(TeamId.UUID_MATCHER);
      expect(String(team.getTeamName())).toMatch(TeamName.TEAMNAME_MATCHER);
      expect.arrayContaining(team.getPairIds());
      expect.arrayContaining(team.getUserIds());
    });

    it('Teamインスタンスメソッドが意図したとおりに動作する', () => {
      team.changePairIds();
      expect(team.getPairIds()).toHaveLength(0);
      team.changeUserIds();
      expect(team.getUserIds()).toHaveLength(0);
    });
  });

  describe('異常系テスト', () => {
    // TODO:3名未満ユーザー構成のチームを省く
  });
});
