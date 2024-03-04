using Finances.Engine.Data.Models;
using System.Collections.Generic;

namespace Finances.App.WebApp.Models.Views.Categories {

    public class CategoriesIndexViewModel
    {
        public IEnumerable<CategoryGroup> CategoryGroups { get; set; }
    }
}
