using finances.api.Logic;
using Moq;
using NUnit.Framework;

namespace finances.api.test.Logic {
    public class GetPageCountTests {

        [Test]
        public void ItemCountIsNegative_Throws() {
            Assert.Throws<InvalidOperationException>(() => PagingLogic.GetPageCount(itemCount: -1, pageSize: It.IsAny<int>()));
        }

        [TestCase(-1)]
        [TestCase(0)]
        public void PageSizeIsZeroOrNegative_Throws(int pageSize) {
            Assert.Throws<InvalidOperationException>(() => PagingLogic.GetPageCount(itemCount: It.IsAny<int>(), pageSize));
        }

        [Test]
        public void ItemCountIsZero_ReturnsOne() {
            Assert.That(PagingLogic.GetPageCount(itemCount: 0, pageSize: 1), Is.EqualTo(1));
        }

        [TestCase(1, 1, 1)]
        [TestCase(2, 3, 1)]
        public void PageSizeMatchesOrExceedsItemsCount_ReturnsItemCount(int itemCount, int pageSize, int expectedPageCount) {
            Assert.That(PagingLogic.GetPageCount(itemCount, pageSize), Is.EqualTo(expectedPageCount));
        }

        [TestCase(2, 1, 2)]
        [TestCase(5, 2, 3)]
        public void ItemCountExceedsPageSize_ReturnsExpected(int itemCount, int pageSize, int expectedPageCount) {
            Assert.That(PagingLogic.GetPageCount(itemCount, pageSize), Is.EqualTo(expectedPageCount));
        }
    }
}