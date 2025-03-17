using finances2.api.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace finances2.api.Controllers {

    public class CategoriesController(ICategoryRepository categoryRepository) : Controller {

        private readonly ICategoryRepository _categoryRepository = categoryRepository;

        [HttpGet]
        public IActionResult Get() {
            return Ok(_categoryRepository.Categories
                    .OrderBy(x => x.Group.DisplayOrder)
                    .ThenBy(x => x.Group.Name)
                    .ThenBy(x => x.GroupDisplayOrder)
                    .ThenBy(x => x.NameWithGroup)
            );
        }
    }
}
