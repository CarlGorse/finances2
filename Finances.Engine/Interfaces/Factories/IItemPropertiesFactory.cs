using Finances.Engine.Data.Models.Interfaces;

namespace Finances.Engine.Interfaces.Factories {
    public interface IItemPropertiesFactory {
        Dtos.IItemProperties<T> Get<T>();
    }
}