export default class IssueName {
    private issueName: string;

    constructor(issueName: string) {
        if (!issueName) {
            throw new Error('Do not match IssueName FORMAT')
        }
        this.issueName = issueName
    }

    public get(): string {
        return this.issueName
    }
}