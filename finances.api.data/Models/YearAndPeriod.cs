namespace finances.api.Data.Models {

    public partial class YearAndPeriod(int year, int period) {

        public int Year { get; private set; } = year;
        public int Period { get; private set; } = period;
    }
}
