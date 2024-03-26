using finances.api.Services;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace finances.api.test.integration.ProgramTests {

    [TestFixture]
    public class BasicTests {

        WebApplicationFactory<Program> _factory = new();

        [OneTimeSetUp]
        public void OneTImeSetUp() {
            _factory = new WebApplicationFactory<Program>();
        }

        [Test]
        public void ITransactionGetter() {
            using var scope = _factory.Services.CreateScope();
            scope.ServiceProvider.GetRequiredService<ITransactionGetter>();
        }

        [Test]
        public void ITransactionManagementService() {
            using var scope = _factory.Services.CreateScope();
            scope.ServiceProvider.GetRequiredService<ITransactionManagementService>();
        }

        [Test]
        public void ITransactionWageMover() {
            using var scope = _factory.Services.CreateScope();
            scope.ServiceProvider.GetRequiredService<ITransactionWageMover>();
        }
    }
}
