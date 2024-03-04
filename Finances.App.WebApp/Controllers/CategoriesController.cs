using Finances.App.WebApp.Interfaces.Services;
using Finances.App.WebApp.Models.Views.Categories;
using Finances.App.WebApp.Services;
using Finances.Engine.Data.Models;
using Finances.Engine.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace Finances.App.WebApp.Controllers {

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
        private readonly ICategoryGroupRepository _CategoryGroupRepository;
        private readonly IEditableItemControllerService<Category> _ControllerService;

        public CategoriesController(
            ICategoryRepository categoryRepository,
            ICategoryGroupRepository categoryGroupRepository,
            IEditableItemControllerService<Category> controllerService) {

            _CategoryRepository = categoryRepository;
            _CategoryGroupRepository = categoryGroupRepository;
            _ControllerService = controllerService;
        }

        [HttpGet]
        public IActionResult Index() {
            return View(
                ActionNames.Index,
                model: new CategoriesIndexViewModel { CategoryGroups = _CategoryGroupRepository.CategoryGroups });
        }

        [HttpPost]
        public IActionResult Search() {
            return Ok(new {
                categories = _CategoryRepository.Categories
                    .OrderBy(x => x.Group.DisplayOrder)
                    .ThenBy(x => x.Group.Name)
                    .ThenBy(x => x.GroupDisplayOrder)
                    .ThenBy(x => x.NameWithGroup)
            });
        }

        [HttpPost]
        public IActionResult Get(IEnumerable<int> ids) {
            return _ControllerService.Get(ids);
        }

        [HttpPost]
        public IActionResult Add(Category category) {
            return _ControllerService.Add(category);
        }
        
        [HttpPost]
        public IActionResult Edit(Category category) {
            return _ControllerService.Edit(category);
        }

        [HttpPost]
        public IActionResult Delete(IEnumerable<int> ids) {
            return _ControllerService.Delete(ids);
        }
    }
}
