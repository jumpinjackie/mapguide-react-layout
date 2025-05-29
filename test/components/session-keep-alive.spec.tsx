import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SessionKeepAlive } from '../../src/components/session-keep-alive';
import type { Client } from '../../src/api/client';

describe('SessionKeepAlive', () => {
    let getSession: () => string;
    let client: Client;
    let onSessionExpired: () => void;

    beforeEach(() => {
        getSession = vi.fn(() => 'session-id');
        client = {
            getServerSessionTimeout: vi.fn(() => Promise.resolve(300))
        } as unknown as Client;
        onSessionExpired = vi.fn();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.resetAllMocks();
        vi.useRealTimers();
    });

    it('should initialize and set interval when check is true', async () => {
        (client.getServerSessionTimeout as any).mockResolvedValue(300);
        const keepAlive = new SessionKeepAlive(getSession, client, onSessionExpired, true);
        // Wait for the promise in constructor to resolve
        await Promise.resolve();
        expect(client.getServerSessionTimeout).toHaveBeenCalledWith('session-id');
        keepAlive.dispose();
    });

    it('should not call getServerSessionTimeout when check is false', () => {
        const keepAlive = new SessionKeepAlive(getSession, client, onSessionExpired, false);
        expect(client.getServerSessionTimeout).not.toHaveBeenCalled();
        keepAlive.dispose();
    });

    it('should clear timeout on dispose', async () => {
        vi.spyOn(global, 'clearTimeout');
        (client.getServerSessionTimeout as any).mockResolvedValue(300);
        const keepAlive = new SessionKeepAlive(getSession, client, onSessionExpired, true);
        await Promise.resolve();
        keepAlive.dispose();
        expect(clearTimeout).toHaveBeenCalled();
    });

    it('lastTry should call getServerSessionTimeout when check is true', async () => {
        (client.getServerSessionTimeout as any).mockResolvedValue(123);
        const keepAlive = new SessionKeepAlive(getSession, client, onSessionExpired, true);
        const result = await keepAlive.lastTry();
        expect(client.getServerSessionTimeout).toHaveBeenCalledWith('session-id');
        expect(result).toBe(123);
        keepAlive.dispose();
    });

    it('lastTry should resolve -1 when check is false', async () => {
        const keepAlive = new SessionKeepAlive(getSession, client, onSessionExpired, false);
        const result = await keepAlive.lastTry();
        expect(result).toBe(-1);
        keepAlive.dispose();
    });

    it('tick should schedule next timeout', async () => {
        (client.getServerSessionTimeout as any).mockResolvedValue(300);
        const keepAlive = new SessionKeepAlive(getSession, client, onSessionExpired, true);
        await Promise.resolve();
        // Simulate tick
        (client.getServerSessionTimeout as any).mockResolvedValue(300);
        // @ts-expect-error: access private for test
        await keepAlive.tick();
        expect(client.getServerSessionTimeout).toHaveBeenCalledTimes(2);
        keepAlive.dispose();
    });
});