using finances.api.Comparers;
using finances.api.Data.Models;
using NUnit.Framework;

namespace finances.api.test.Comparers {
    public class TransactionComparerTests {

        [TestCase(true, false)]
        [TestCase(false, true)]
        [TestCase(true, true)]
        public void EitherTransactionIsNull_ReturnsInequal(bool isFirstTransactionNull, bool isSecondTransactionNull) {
            Assert.That(new TransactionComparer().Compare(
                isFirstTransactionNull ? null : new Transaction(),
                isSecondTransactionNull ? null : new Transaction()),
                Is.Not.Zero);
        }

        [Test]
        public void TransactionsHaveDifferentAccountIds_ReturnsInequal() {
            Assert.That(new TransactionComparer().Compare(
                new Transaction { AccountId = 1 },
                new Transaction { AccountId = 2 }
                ), Is.Not.Zero);
        }

        [Test]
        public void TransactionsHaveSameAccounIds_ReturnsEqual() {
            Assert.That(new TransactionComparer().Compare(
                new Transaction { AccountId = 1 },
                new Transaction { AccountId = 1 }
                ), Is.Zero);
        }

        [Test]
        public void TransactionsHaveDifferentEffDate_ReturnsInequal() {
            Assert.That(new TransactionComparer().Compare(
                new Transaction { EffDate = new DateOnly(2001, 1, 1) },
                new Transaction { EffDate = new DateOnly(2001, 1, 2) }
                ), Is.Not.Zero);
        }

        [Test]
        public void TransactionsHaveSameEffDate_ReturnsEqual() {
            Assert.That(new TransactionComparer().Compare(
                new Transaction { EffDate = DateOnly.FromDateTime(DateTime.Today) },
                new Transaction { EffDate = DateOnly.FromDateTime(DateTime.Today) }
                ), Is.Zero);
        }

        [TestCase(false, true)]
        [TestCase(true, false)]
        public void TransactionsAreNotBothWages_ReturnsInequal(bool firstTransactionIsWage, bool secondTransactionIsWage) {
            Assert.That(new TransactionComparer().Compare(
                new Transaction { IsWage = firstTransactionIsWage },
                new Transaction { IsWage = secondTransactionIsWage }
                ), Is.Not.Zero);
        }

        [TestCase(true)]
        [TestCase(false)]
        public void TransactionsAreBothWages_ReturnsEqual(bool isWage) {
            Assert.That(new TransactionComparer().Compare(
                new Transaction { IsWage = isWage },
                new Transaction { IsWage = isWage }
                ), Is.Zero);
        }

        [Test]
        public void TransactionsHaveDifferentCategoryId_ReturnsInequal() {
            Assert.That(new TransactionComparer().Compare(
                new Transaction { CategoryId = 1 },
                new Transaction { CategoryId = 2 }
                ), Is.Not.Zero);
        }

        [Test]
        public void TransactionsHaveSameCategoryId_ReturnsEqual() {
            Assert.That(new TransactionComparer().Compare(
                new Transaction { CategoryId = 1 },
                new Transaction { CategoryId = 1 }
                ), Is.Zero);
        }

        [Test]
        public void TransactionsHaveDifferentTransactionId_ReturnsInequal() {
            Assert.That(new TransactionComparer().Compare(
                new Transaction { TransactionId = 1 },
                new Transaction { TransactionId = 2 }
                ), Is.Not.Zero);
        }

        [Test]
        public void TransactionsHaveSameTransactionId_ReturnsEqual() {
            Assert.That(new TransactionComparer().Compare(
                new Transaction { TransactionId = 1 },
                new Transaction { TransactionId = 1 }
                ), Is.Zero);
        }
    }
}