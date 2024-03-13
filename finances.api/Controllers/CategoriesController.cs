using Finances.Engine.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace finances.api.Controllers {

    public class CategoriesController : Controller {

        public const string ControllerName = "Categories";

        public static class ActionNames {
            public const string Index = "Index";
            public const string Add = "Add";
            public const string Delete = "Delete";
            public const string Search = "Search";
            public const string Edit = "Edit";
        }

        private readonly ICategoryRepository _CategoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository) {
            _CategoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get() {
            return Ok(_CategoryRepository.Categories
                    .OrderBy(x => x.Group.DisplayOrder)
                    .ThenBy(x => x.Group.Name)
                    .ThenBy(x => x.GroupDisplayOrder)
                    .ThenBy(x => x.NameWithGroup)
            );
        }
    }
}
