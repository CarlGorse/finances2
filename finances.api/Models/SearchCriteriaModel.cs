namespace finances.api.Models {

    public class SearchCriteriaModel {

        public int AccountId { get; set; }
        public int StartYear { get; set; }
        public int StartPeriod { get; set; }
        public int EndYear { get; set; }
        public int EndPeriod { get; set; }
        public int PageNo { get; set; }
    }
}
