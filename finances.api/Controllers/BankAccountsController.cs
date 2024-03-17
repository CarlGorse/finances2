using finances.api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace finances.api.Controllers {

    public class BankAccountsController(IAccountRepository bankAccountRepository) : Controller {

        private readonly IAccountRepository _bankAccountRepository = bankAccountRepository;

        [HttpGet]
        public IActionResult Get() {
            return new OkObjectResult(new { _bankAccountRepository.Accounts });
        }
    }
}
