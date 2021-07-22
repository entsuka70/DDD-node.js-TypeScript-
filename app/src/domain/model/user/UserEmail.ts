export default class UserEmail {
    private userEmail: string;

    static USEREMAIL_MATCHER = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    constructor(userEmail: string) {
        if (userEmail && !UserEmail.USEREMAIL_MATCHER.test(userEmail)) {
            throw new Error('Do not match UserEmail FORMAT')
        }
        this.userEmail = userEmail
    }

    public get(): string {
        return this.userEmail
    }

}