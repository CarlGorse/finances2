﻿using System;

namespace finances.api.CategoryTotalsReport.Dto {

    public class YearAndPeriodSearchDTO {

        public int StartYear { get; set; }
        public int StartPeriod { get; set; }
        public int EndYear { get; set; }
        public int EndPeriod { get; set; }

        public DateOnly StartDate => DateOnly.FromDateTime(new DateTime(StartYear, StartPeriod, 1));
        public DateOnly EndDate => DateOnly.FromDateTime(new DateTime(EndYear, EndPeriod, 1).AddMonths(1).AddDays(-1));
    }
}
