import { Client } from '../api/client';
export class SessionKeepAlive {
    private getSession: () => string;
    private client: Client;
    private interval: number;
    private timeoutID: any;
    constructor(getSession: () => string, client: Client, onSessionExpired: () => void, private check: boolean) {
        this.getSession = getSession;
        this.client = client;
        if (this.check) {
            this.client.getServerSessionTimeout(this.getSession()).then(tm => {
                this.interval = tm / 5 * 1000; //Ping server 5 times each period. Timeout is returned in seconds.
                this.timeoutID = setTimeout(this.tick.bind(this), this.interval);
            });
        }
    }
    public dispose() {
        clearTimeout(this.timeoutID);
    }
    private tick(): void {
        this.client.getServerSessionTimeout(this.getSession()).then(tm => {
            this.timeoutID = setTimeout(this.tick.bind(this), this.interval);
        });
    }
    public lastTry(): Promise<number> {
        if (this.check) {
            return this.client.getServerSessionTimeout(this.getSession());
        } else {
            return Promise.resolve(-1);
        }
    }
}
