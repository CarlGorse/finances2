using Finances.Engine.Data.Models.Interfaces;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Finances.Engine.Data.Models {

    public class CategoryGroup : IEditableItem<CategoryGroup> {

        [Key]
        public int CategoryGroupId { get; set; }
        public string Name { get; set; }
        public int DisplayOrder { get; set; }

        [JsonIgnore]
        public ICollection<Category> Categories { get; set; }

        [NotMapped]
        public int Id {
            get => CategoryGroupId;
            set => CategoryGroupId = value;
        }
    }
}
