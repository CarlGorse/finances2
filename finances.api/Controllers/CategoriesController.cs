using finances.api.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace finances.api.Controllers {

    public class CategoriesController : Controller {

        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository) {
            _categoryRepository = categoryRepository;
        }

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
