using finances.api.Logic;
using Moq;
using NUnit.Framework;

namespace finances.api.test.Logic {

    public class GetPagedItemsTests {

        [Test]
        public void ItemsIsNull_Throws() {
            Assert.Throws<ArgumentNullException>(() => PagingLogic.GetPagedItems<int?>(items: null, pageSize: It.IsAny<int>(), pageNo: It.IsAny<int>()));
        }

        [TestCase(0)]
        [TestCase(-1)]
        public void PageSizeIsZeroOrNegative_Throws(int pageSize) {
            Assert.Throws<InvalidOperationException>(() => PagingLogic.GetPagedItems<int>(items: [], pageSize: pageSize, pageNo: 1));
        }

        [TestCase(0)]
        [TestCase(-1)]
        public void PageNoIsZeroOrNegative_Throws(int pageNo) {
            Assert.Throws<InvalidOperationException>(() => PagingLogic.GetPagedItems<int>(items: [], pageSize: It.IsAny<int>(), pageNo: pageNo));
        }

        [Test]
        public void NoItems_ReturnsZero() {
            Assert.That(PagingLogic.GetPagedItems<int>(items: [], pageSize: 1, pageNo: 1), Is.Empty);
        }

        [TestCase(1, 1, 1, 0, 0)]
        [TestCase(1, 2, 1, 0, 0)]
        [TestCase(2, 1, 1, 0, 0)]
        [TestCase(2, 2, 1, 0, 1)]
        [TestCase(2, 2, 1, 0, 1)]
        public void RequestedPageHasItems_ReturnsExpectedItems(int itemCount, int pageSize, int pageNo, int expectedFirstItem, int expectedLastItem) {

            var items = Enumerable.Range(0, itemCount).ToArray();

            var result = PagingLogic.GetPagedItems(items, pageSize, pageNo);

            Assert.That(result.ToList()[0], Is.EqualTo(expectedFirstItem));
            Assert.That(result.ToList()[result.Count - 1], Is.EqualTo(expectedLastItem));
        }

        [TestCase(2)]
        [TestCase(3)]
        public void PageNoExceedsPageCount_ReturnsNull(int pageNo) {

            var result = PagingLogic.GetPagedItems(items: [0], pageSize: 1, pageNo: pageNo);

            Assert.That(result.ToList(), Is.Empty);
        }
    }
}
