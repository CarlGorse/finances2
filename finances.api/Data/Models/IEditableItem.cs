namespace finances.api.Data.Models {

    public interface IEditableItem<T> : IGettableItem<T> where T : class {
    }
}
