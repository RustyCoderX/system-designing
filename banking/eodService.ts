import { LoanTokenService } from "./tokenService";

export class EODService {
  static async runInterestAccrual(loanId: string, date: string) {
    console.log(`Running interest for ${loanId}`);

    // Example:
    // await loanRepository.applyInterest(loanId);

    // Create token after accrual
    await LoanTokenService.createToken(loanId, date);

    console.log(`Token created for ${loanId}`);
  }
}