using Finances.App.WebApp.Interfaces.Services;
using Finances.App.WebApp.Models.Views.Categories;
using Finances.Engine.Data.Models;
using Finances.Engine.Data.Repositories.Interfaces;
using Finances.Engine.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace Finances.App.WebApp.Controllers {

    public class CategoryGroupsController : Controller {

        public const string ControllerName = "CategoryGroups";

        public static class ActionNames {
            public const string Index = "Index";
            public const string Add = "Add";
            public const string Delete = "Delete";
            public const string Search = "Search";
            public const string Edit = "Edit";
        }

        private readonly ICategoryGroupRepository _CategoryGroupRepository;
        private readonly IEditableItemControllerService<CategoryGroup> _ControllerService;

        public CategoryGroupsController(
            ICategoryGroupRepository categoryGroupRepository,
            IEditableItemControllerService<CategoryGroup> controllerService) {

            _CategoryGroupRepository = categoryGroupRepository;
            _ControllerService = controllerService;
        }

        [HttpGet]
        public IActionResult Index() {

            var model = new CategoryGroupIndexViewModel {
                CategoryGroups = _CategoryGroupRepository.CategoryGroups
            };

            return View(ActionNames.Index, model);
        }

        [HttpPost]
        public IActionResult Search() {

            var categoryGroups = _CategoryGroupRepository.CategoryGroups
                .OrderBy(x => x.DisplayOrder);

            return Ok(new { categoryGroups });
        }

        [HttpPost]
        public IActionResult Get(IEnumerable<int> ids) {
            return _ControllerService.Get(ids);
        }

        [HttpPost]
        public IActionResult Add(CategoryGroup categoryGroup) {
            return _ControllerService.Add(categoryGroup);
        }

        [HttpPost]
        public IActionResult Edit(CategoryGroup categoryGroup) {
            return _ControllerService.Edit(categoryGroup);
        }

        [HttpPost]
        public IActionResult Delete(IEnumerable<int> ids) {
            return _ControllerService.Delete(ids);
        }
    }
}
