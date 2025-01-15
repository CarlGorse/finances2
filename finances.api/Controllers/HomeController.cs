using Microsoft.AspNetCore.Mvc;

namespace finances.api.Controllers {
    public class HomeController : Controller {

        [HttpGet]
        public IActionResult Index() {
            return View();
        }
    }
}
