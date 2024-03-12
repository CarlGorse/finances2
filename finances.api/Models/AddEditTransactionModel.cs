using Finances.Engine.Data.Models;
using System.Collections.Generic;

namespace finances.api.Models {

    public class AddEditTransactionModel : AddEditItemViewModel {

        public readonly IEnumerable<Account> Accounts;
        public readonly string AddOrEditText;
        public readonly IEnumerable<Category> Categories;
        public int CategoryIdToDeductWageFrom { get; set; }
        public Transaction Transaction { get; set; }

        public AddEditTransactionModel() {
        }

        public AddEditTransactionModel(
            IEnumerable<Account> accounts,
            IEnumerable<Category> categories,
            AddOrEdit addOrEdit) {

            Accounts = accounts;
            Categories = categories;
            AddOrEditText = addOrEdit.ToString().ToLower();
        }
    }
}
