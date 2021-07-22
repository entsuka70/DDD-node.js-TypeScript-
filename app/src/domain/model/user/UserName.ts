export default class UserName {
    private userName: string;

    static USERNAME_MATCHER = /^[0-9a-zA-Z]{0,32}$/;

    constructor(userName: string) {
        if (userName && !UserName.USERNAME_MATCHER.test(userName)) {
            throw new Error('Do not match UserName FORMAT')
        }
        this.userName = userName
    }

    public get(): string {
        return this.userName
    }

}