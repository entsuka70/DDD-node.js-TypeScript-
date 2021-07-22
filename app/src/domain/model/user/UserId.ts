export default class UserId {
    private userId: string;

    static UUID_FORMAT = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    static UUID_MATCHER = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    constructor(userId?: string) {
        if (userId && !UserId.UUID_MATCHER.test(userId)) {
            throw new Error('Do not match UUID FORMAT')
        }
        this.userId = userId ?? UserId.generateUuid();
    }

    public get(): string {
        return this.userId
    }

    public static generateUuid() {
        // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
        // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        let chars = UserId.UUID_FORMAT.split("");
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