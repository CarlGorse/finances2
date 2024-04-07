using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Dto;
using finances.api.Dto.ReportService;
using finances.api.Services;
using finances.api.test.data;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

using static finances.api.test.data.TransactionExtensions;

namespace finances.api.test.integration.TransactionGetterTests {

    [TestFixture]
    public class BasicTests {

        WebApplicationFactory<Program> _appFactory = new();
        TestDataFactory _testDataFactory = null!;
        IReportService _reportService = null!;

        [SetUp]
        public void SetUp() {

            _appFactory = new WebApplicationFactory<Program>();

            var scope = _appFactory.Services.CreateScope();

            _reportService = scope.ServiceProvider.GetRequiredService<IReportService>();

            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            _testDataFactory = new TestDataFactory(dbContext);

            _testDataFactory.AddBaseData();
        }

        [Test]
        public void OneTransaction_ReturnsSingleTotal() {

            _testDataFactory.AddTransactions(
                [
                new() {
                    TransactionId = 11,
                    AccountId = 1,
                    CategoryId = 1,
                    EffDate=new DateOnly(2023, 3, 1),
                    Credit = 1
                }
            ]);

            var actual = _reportService.GetCategoryTotalsReport(new YearAndPeriodSearch {
                StartYear = 2023,
                StartPeriod = 1,
                EndYear = 2024,
                EndPeriod = 3,
                AccountId = 1
            });

            Assert.That(actual, Is.EquivalentTo(new CategoryTotalsReport[] {
                new() {
                    CategoryTotals = [
                        new CategoryTotal {
                            CategoryId = 1,
                            YearAndPeriodTotals = [
                                new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2023, period: 3), Total = 1 }
                            ]
                        }
                    ],
                    YearAndPeriodTotals = [
                        new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2023, period: 3), Total = 1 }
                    ]
                }
            }));
        }

        [Test]
        public void TwoTransactionsForSameCategoryAndYearPeriod_ReturnsSingleTotalForSum() {

            _testDataFactory.AddTransactions(
                [
                new() {
                    TransactionId = 2,
                    AccountId = 1,
                    CategoryId = 1,
                    EffDate=new DateOnly(2023, 3, 1),
                    Credit = 1
                },
                new() {
                    TransactionId = 3,
                    AccountId = 1,
                    CategoryId = 1,
                    EffDate=new DateOnly(2023, 3, 1),
                    Debit = 4
                }
            ]);

            var actual = _reportService.GetCategoryTotalsReport(new YearAndPeriodSearch {
                StartYear = 2023,
                StartPeriod = 1,
                EndYear = 2024,
                EndPeriod = 3,
                AccountId = 1
            });

            Assert.That(actual.CategoryTotals, Is.EquivalentTo(new CategoryTotalsReport[] { new() {
                CategoryTotals = [
                    new CategoryTotal {
                        CategoryId = 1,
                        YearAndPeriodTotals = [
                            new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2023, period: 3), Total = -3 }
                        ]
                    }
                ],
                YearAndPeriodTotals = [
                    new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2023, period: 3), Total = -3 }
            ] }
            }));
        }

        [Test]
        public void TwoTransactionsForDifferentCategoryAndSameYearPeriod_ReturnsTwoTotals() {

            _testDataFactory.AddTransactions(
                [
                new() {
                    TransactionId = 4,
                    AccountId = 1,
                    CategoryId = 1,
                    EffDate=new DateOnly(2023, 3, 1),
                    Credit = 1
                },
                new() {
                    TransactionId = 5,
                    AccountId = 1,
                    CategoryId = 2,
                    EffDate=new DateOnly(2023, 3, 1),
                    Credit = 2
                }
            ]);

            var actual = _reportService.GetCategoryTotalsReport(new YearAndPeriodSearch {
                StartYear = 2023,
                StartPeriod = 1,
                EndYear = 2024,
                EndPeriod = 3,
                AccountId = 1
            });

            Assert.That(actual.CategoryTotals, Is.EquivalentTo(new CategoryTotalsReport[] { new() {
                CategoryTotals = [
                    new CategoryTotal {
                        CategoryId = 2,
                        YearAndPeriodTotals = [
                            new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2023, period: 3), Total = 2 },
                        ]
                    },
                    new CategoryTotal {
                        CategoryId = 1,
                        YearAndPeriodTotals = [
                            new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2023, period: 3), Total = 1 },
                        ]
                    }
                ],
                YearAndPeriodTotals = [
                    new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2023, period: 3), Total = 3 }
            ] }
            }));
        }

        [Test]
        public void TwoTransactionsForSameCategoryAndDifferentYearPeriod_ReturnsTwoTotals() {

            _testDataFactory.AddTransactions(
                [
                new() {
                    TransactionId = 6,
                    AccountId = 1,
                    CategoryId = 1,
                    EffDate=new DateOnly(2023, 3, 1),
                    Credit = 1
                },
                new() {
                    TransactionId = 7,
                    AccountId = 1,
                    CategoryId = 2,
                    EffDate=new DateOnly(2023, 3, 1),
                    Credit = 2
                }
            ]);

            var actual = _reportService.GetCategoryTotalsReport(new YearAndPeriodSearch {
                StartYear = 2023,
                StartPeriod = 1,
                EndYear = 2024,
                EndPeriod = 3,
                AccountId = 1
            });

            Assert.That(actual.CategoryTotals, Is.EquivalentTo(new CategoryTotalsReport[] { new() {
                CategoryTotals = [
                    new CategoryTotal {
                        CategoryId = 2,
                        YearAndPeriodTotals = [
                            new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2023, period: 3), Total = 2 }
                        ]
                    },
                    new CategoryTotal {
                        CategoryId = 1,
                        YearAndPeriodTotals = [
                            new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2023, period: 3), Total = 1 }
                        ]
                    }
                ],
                YearAndPeriodTotals = [
                    new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2023, period: 3), Total = 3 }
            ] }
            }));
        }
    }
}
