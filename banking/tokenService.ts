import { redis } from "./redis";

export class LoanTokenService {
  private static getKey(loanId: string, date: string) {
    return `loan:${loanId}:${date}`;
  }

  // Called AFTER interest accrual completes
  static async createToken(loanId: string, date: string) {
    const key = this.getKey(loanId, date);

    // SETNX ensures idempotency
    await redis.set(key, "READY", "EX", 60 * 60 * 24); // expire after 1 day
  }

  // Called BEFORE processing payment
  static async acquireToken(loanId: string, date: string): Promise<boolean> {
    const key = this.getKey(loanId, date);

    const value = await redis.get(key);
    return value === "READY";
  }

  // Optional: consume token if only one operation allowed
  static async consumeToken(loanId: string, date: string): Promise<boolean> {
    const key = this.getKey(loanId, date);

    // Atomic get + delete
    const lua = `
      local val = redis.call("GET", KEYS[1])
      if val == "READY" then
        redis.call("DEL", KEYS[1])
        return 1
      end
      return 0
    `;

    const result = await redis.eval(lua, 1, key);
    return result === 1;
  }
}