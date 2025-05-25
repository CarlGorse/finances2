import Transaction from "types/Transaction";
import ValidationResult from "types/ValidationResult";

export function isValid(transaction: Transaction): ValidationResult {
  if (isNaN(Date.parse(transaction.EffDate.toString()))) {
    return {
      IsValid: false,
      Errors: ["Invalid Date"],
    } as ValidationResult;
  }

  if (transaction.Debit < 0) {
    return {
      IsValid: false,
      Errors: ["Debit cannot be negative."],
    } as ValidationResult;
  }

  if (transaction.Credit < 0) {
    return {
      IsValid: false,
      Errors: ["Credit cannot be negative."],
    } as ValidationResult;
  }

  return { IsValid: true, Errors: null } as ValidationResult;
}
