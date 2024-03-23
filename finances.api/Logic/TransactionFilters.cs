using System.Collections.Generic;

namespace finances.api.Logic {

    public class TransactionFilters {

        public readonly List<int> CategoryIds;
        public readonly List<string> Descriptions;
        public readonly List<string> Items;

        public int? AccountId { get; set; }
        public int? StartYear { get; set; }
        public int? StartPeriod { get; set; }
        public int? EndYear { get; set; }
        public int? EndPeriod { get; set; }
        public int? TransactionId { get; set; }

        public TransactionFilters() {
            CategoryIds = [];
            Descriptions = [];
            Items = [];
        }
    }
}
