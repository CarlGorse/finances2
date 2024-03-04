using Finances.Engine.Interfaces.Dtos;

namespace Finances.Engine.Dtos {

    public class ItemProperties<T> : IItemProperties<T> {

        public string DescriptionPlural { get; }
        public string DescriptionSingle { get; }
        public string Name { get; }

        public ItemProperties(string name, string descriptionSingle, string descriptionPlural) {
            Name = name;
            DescriptionSingle = descriptionSingle;
            DescriptionPlural = descriptionPlural;
        }
    }
}
