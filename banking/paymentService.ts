import { LoanTokenService } from "./tokenService";

export class PaymentService {
  static async processPayment(
    loanId: string,
    date: string,
    amount: number
  ) {
    const allowed = await LoanTokenService.acquireToken(loanId, date);

    if (!allowed) {
      throw new Error("Interest not accrued yet. Payment blocked.");
    }

    // Proceed with payment logic
    console.log(`Processing payment of ${amount} for ${loanId}`);

    // Example DB update
    // await loanRepository.applyPayment(loanId, amount);

    return { status: "SUCCESS" };
  }
}