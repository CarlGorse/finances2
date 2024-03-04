using Finances.Engine.Data.Models.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Finances.Engine.Data.Models {

    public class Account : IGettableItem<Account> {

        [Key]
        public int AccountId { get; private set; }

        public string Name { get; set; }

        public int DisplayOrder { get; set; }

        [JsonIgnore]
        public IEnumerable<Transaction> Transactions { get; set; }

        public Account(int accountId) {
            AccountId = accountId;
        }

        [NotMapped]
        public int Id {
            get => AccountId;
            set => AccountId = value;
        }
    }
}
