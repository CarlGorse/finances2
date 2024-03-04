using Finances.App.WebApp.Models.Views.Shared;
using Finances.Engine.Data.Models;
using System.Collections.Generic;

namespace Finances.App.WebApp.Models.Views.Transactions {

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
