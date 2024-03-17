using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances.api.Data.Models {

    public class Account(int accountId) : IGettableItem<Account> {

        [Key]
        public int AccountId { get; private set; } = accountId;

        public string Name { get; set; }

        public int DisplayOrder { get; set; }

        [JsonIgnore]
        public IEnumerable<Transaction> Transactions { get; set; }

        [NotMapped]
        public int Id {
            get => AccountId;
            set => AccountId = value;
        }

        public static string TypeDescriptions => "accounts";

        public static string TypeDescription => "account";

        public static string TypeName => "Account";
    }
}
