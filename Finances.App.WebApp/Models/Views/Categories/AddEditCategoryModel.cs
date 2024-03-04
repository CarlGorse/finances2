using Finances.App.WebApp.Models.Views.Shared;
using Finances.Engine.Data.Models;
using System.Collections.Generic;

namespace Finances.App.WebApp.Models.Views.Categories {

    public class AddEditCategoryModel : AddEditItemViewModel {

        public readonly IEnumerable<CategoryGroup> CategoryGroups;

        public readonly string AddOrEditText;

        public Category Category = null;

        public AddEditCategoryModel() { }

        public AddEditCategoryModel(
            IEnumerable<CategoryGroup> categoryGroups,
            AddOrEdit addOrEdit) {

            CategoryGroups = categoryGroups;
            AddOrEditText = addOrEdit.ToString().ToLower();
        }
    }
}
