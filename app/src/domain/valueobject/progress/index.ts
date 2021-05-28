export default class ProgressValueObject {
    private progress: number;

    static PROGRESS_BEFORE = 0; // 未着手
    static PROGRESS_WAITING = 1; // レビュー待ち
    static PROGRESS_COMPLETE = 2; // 完了

    constructor(progress?: number) {
        const status = this.checkRangeProgress(progress);
        this.progress = status;
    }

    public checkRangeProgress(progress?: number | null): number {
        if (!progress) {
          return ProgressValueObject.PROGRESS_BEFORE;
        }
        if (
            ProgressValueObject.PROGRESS_BEFORE >= progress ||
          progress >= ProgressValueObject.PROGRESS_COMPLETE
        ) {
          throw new Error('progress is invalid.');
        }
        return progress;
      }
}