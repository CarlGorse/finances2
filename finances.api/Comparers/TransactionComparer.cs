using finances2.api.Data.Models;
using System.Collections.Generic;

namespace finances2.api.Comparers {
    public class TransactionComparer : IComparer<Transaction> {

        public int Compare(Transaction x, Transaction y) {

            if (x == null || y == null) {
                return -1;
            }

            if (x.AccountId != y.AccountId) {
                return x.AccountId.CompareTo(y.AccountId);
            }

            if (x.EffDate != y.EffDate) {
                return x.EffDate.CompareTo(y.EffDate);
            }

            if (x.IsWage != y.IsWage) {
                return x.IsWage.CompareTo(y.IsWage);
            }

            if (x.CategoryId != y.CategoryId) {
                return x.CategoryId.CompareTo(y.CategoryId);
            }

            if (x.TransactionId != y.TransactionId) {
                return x.TransactionId.CompareTo(y.TransactionId);
            }

            return 0;
        }
    }
}
