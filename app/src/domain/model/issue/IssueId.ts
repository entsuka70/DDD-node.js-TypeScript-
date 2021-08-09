export default class IssueId {
    private issueId: string;

    static UUID_FORMAT = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    static UUID_MATCHER = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    constructor(issueId?: string) {
        if (issueId && !IssueId.UUID_MATCHER.test(issueId)) {
            throw new Error('Do not match UUID FORMAT')
        }
        this.issueId = issueId ?? IssueId.generateUuid();
    }

    public get(): string {
        return this.issueId
    }

    public static generateUuid() {
        // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
        // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        let chars = IssueId.UUID_FORMAT.split("");
        for (let i = 0, len = chars.length; i < len; i++) {
            switch (chars[i]) {
                case "x":
                    chars[i] = Math.floor(Math.random() * 16).toString(16);
                    break;
                case "y":
                    chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                    break;
            }
        }
        return chars.join("");
    }
}