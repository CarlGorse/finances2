using finances.api.Dtos;

namespace finances.api.Factories {
    public interface IItemPropertiesFactory {
        IItemProperties<T> Get<T>();
    }
}