namespace finances2.api.Data.Models {

    public partial class YearAndPeriod {

        public override bool Equals(object obj) {
            return (obj is YearAndPeriod yearAndPeriod)
                && Year.Equals(yearAndPeriod.Year)
                && Period.Equals(yearAndPeriod.Period);
        }

        public override int GetHashCode() {
            return Year.GetHashCode() ^ Period.GetHashCode();
        }
    }
}
