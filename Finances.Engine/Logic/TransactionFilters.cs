using System;
using System.Collections.Generic;

namespace Finances.Engine.Logic {

    public class TransactionFilters {

        public readonly List<int> CategoryIds;
        public readonly List<string> Descriptions;
        public readonly List<string> Items;

        public int? AccountId { get; set; }
        public int? StartYear { get; set; }
        public int? StartPeriod { get; set; }
        public int? EndYear { get; set; }
        public int? EndPeriod { get; set; }
        public DateTime? StartEffDate { get; set; }
        public DateTime? EndEffDate { get; set; }
        public bool? IsWage { get; set; }
        public bool? Exclude { get; set; }
        public DateTime? DateModifiedFrom { get; set; }
        public DateTime? DateModifiedTo { get; set; }
        public int? TransactionId { get; set; }

        public TransactionFilters() {
            CategoryIds = new List<int>();
            Descriptions = new List<string>();
            Items = new List<string>();
        }
    }
}
