using finanes.api.data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances.api.Data.Models {

    public partial class Account : IGettableItem<Account> {

        [NotMapped]
        public int Id => AccountId;

        public static string TypeDescriptions => "accounts";

        public static string TypeDescription => "account";

        public static string TypeName => "Account";

        public override bool Equals(object obj) {
            return (obj is Account account)
                && Id.Equals(account.Id);
        }

        public override int GetHashCode() {
            return Id.GetHashCode();
        }
    }
}
