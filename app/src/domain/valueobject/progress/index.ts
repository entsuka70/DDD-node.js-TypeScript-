export default class ProgressValueObject {
    private progress: number;

    static PROGRESS_BEFORE = 1; // 未着手
    static PROGRESS_WAITING = 2; // レビュー待ち
    static PROGRESS_COMPLETE = 3; // 完了

    constructor(progress: number) {
        this.progress = this.checkAndGetProgress(progress);
    }

    public getProgress(): number {
        return this.progress;
    }

    public checkAndGetProgress(progress?: number): number {
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