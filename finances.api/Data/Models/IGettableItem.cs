namespace finances.api.Data.Models {

    public interface IGettableItem<T> where T : class {
        int Id { get; set; }
    }
}
