export default class BelongsValueObject {
    private id: number;
    private belong: number;

    static DEFAULT_BLONGS_ID = 1;
    static BELONGS = 1; // 在籍中
    static BELONGS_BREAKING = 2; // 休会中
    static BELONGS_WITHDRAWAL = 3; // 退会済み

    constructor(props: { id: number, belong: number }) {
        const { id, belong } = props;
        this.id = id;
        this.belong = belong;
    }

    public getAllProperties() {
        return {
            id: this.id,
            belong: this.belong,
        };
    }

    public checkRangeBelongs(belongs?: number | null): number {
        if (!belongs) {
            return BelongsValueObject.BELONGS;
        }
        if (
            BelongsValueObject.BELONGS >= belongs ||
            belongs >= BelongsValueObject.BELONGS_WITHDRAWAL
        ) {
            throw new Error('belongs is invalid.');
        }
        return belongs;
    }
}
