import Pair, { PairProps } from 'src/domain/model/pair/Pair';
import PairId from 'src/domain/model/pair/PairId';
import TeamId from 'src/domain/model/team/TeamId';
import PairName from 'src/domain/model/pair/PairName';
import UserId from 'src/domain/model/user/UserId';

describe('domain/model/pair Pair', () => {
  describe('正常系テスト', () => {
    // 利用するPair初期化
    const pairId: PairId = new PairId();
    const teamId: TeamId = new TeamId();
    const pairName: PairName = new PairName('a');
    const userIdMock = jest
      .fn()
      .mockReturnValueOnce('168fc428-6761-404c-952f-d56c3d39d6b0')
      .mockReturnValueOnce('268fc428-6761-404c-952f-d56c3d39d6b0')
      .mockReturnValueOnce('368fc428-6761-404c-952f-d56c3d39d6b0');
    const otherUserIdMock = jest
      .fn()
      .mockReturnValueOnce('468fc428-6761-404c-952f-d56c3d39d6b0')
      .mockReturnValueOnce('568fc428-6761-404c-952f-d56c3d39d6b0')
      .mockReturnValueOnce('668fc428-6761-404c-952f-d56c3d39d6b0');
    function makeUserIds() {
      const ids: UserId[] = [];
      for (let i = 1; i < Pair.MAX_PAIR_USER; i++) {
        ids.push(new UserId(userIdMock()));
      }
      return ids;
    }
    function makeOtherUserIds() {
      const ids: UserId[] = [];
      for (let i = 1; i < Pair.MAX_PAIR_USER; i++) {
        ids.push(new UserId(otherUserIdMock()));
      }
      return ids;
    }
    const user_ids: UserId[] = makeUserIds();
    const other_user_ids: UserId[] = makeOtherUserIds();
    const props: PairProps = {
      id: pairId,
      team_id: teamId,
      pair_name: pairName,
      user_ids: user_ids,
    };
    const pair = new Pair(props);

    it('Pairインスタンス初期化が正常に動作する', () => {
      expect(pair).toBeDefined();
      expect.stringContaining(pair.getId());
      expect(pair.getId()).toMatch(PairId.UUID_MATCHER);
      expect(pair.getTeamId()).toMatch(TeamId.UUID_MATCHER);
      expect(pair.getPairName()).toMatch(PairName.PAIRNAME_MATCHER);
      expect.arrayContaining(pair.getUserIds());
    });

    it('Pairインスタンスメソッドが意図した通りに動作する', () => {
      pair.changeUserIds();
      expect(pair.getUserIds()).toHaveLength(0);
      expect(
        pair.isExistUser('168fc428-6761-404c-952f-d56c3d39d6b0')
      ).toBeFalsy();
    });

    it('Pairインスタンスメソッドが意図したとおりに動作する', () => {
      pair.changeUserIds(other_user_ids);
      expect(pair.getUserIds()).toHaveLength(3);
      expect(
        pair.isExistUser('468fc428-6761-404c-952f-d56c3d39d6b0')
      ).toBeTruthy();
    });
  });
  describe('異常系テスト', () => {
    // 利用するPair初期化
    const pairId: PairId = new PairId();
    const teamId: TeamId = new TeamId();
    const pairName: PairName = new PairName('a');

    function makeUserIds() {
      const ids: UserId[] = [];
      for (let i = 1; i < 10; i++) {
        ids.push(new UserId());
      }
      return ids;
    }
    const user_ids: UserId[] = makeUserIds();
    const props: PairProps = {
      id: pairId,
      team_id: teamId,
      pair_name: pairName,
      user_ids: user_ids,
    };
    it('5名以上のユーザーを持つペアは形成不可', () => {
      expect(() => new Pair(props)).toThrowError();
    });
  });
});
