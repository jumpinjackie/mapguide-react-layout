import { Client } from '../api/client';
export class SessionKeepAlive {
    private getSession: () => string;
    private client: Client;
    private interval: number;
    private timeoutID: any;
    constructor(getSession: () => string, client: Client, onSessionExpired: () => void) {
        this.getSession = getSession;
        this.client = client;
        this.client.getServerSessionTimeout(this.getSession()).then(tm => {
            this.interval = tm / 5 * 1000; //Ping server 5 times each period. Timeout is returned in seconds.
            this.timeoutID = setTimeout(this.tick.bind(this), this.interval);
        });
    }
    private tick(): void {
        this.client.getServerSessionTimeout(this.getSession()).then(tm => {
            this.timeoutID = setTimeout(this.tick.bind(this), this.interval);
        });
    }
    public lastTry(): Promise<number> {
        return this.client.getServerSessionTimeout(this.getSession());
    }
}
