using Microsoft.AspNetCore.Mvc;

namespace finances2.api.Controllers {
    public class HomeController : Controller {

        [HttpGet]
        public IActionResult Index() {
            return View();
        }
    }
}
