using Finances.App.WebApp.Models.Views.Shared;
using Finances.Engine.Data.Models;

namespace Finances.App.WebApp.Models.Views.CategoryGroups {

    public class AddEditCategoryGroupModel: AddEditItemViewModel {

        public readonly string AddOrEditText;

        public CategoryGroup CategoryGroup = new();

        public AddEditCategoryGroupModel() { 
        }

        public AddEditCategoryGroupModel(AddOrEdit addOrEdit) {
            AddOrEditText = addOrEdit.ToString().ToLower();
        }
    }
}
