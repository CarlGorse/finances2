namespace finanes.api.data.Models {

    public interface IGettableItem<T> where T : class {
        int Id { get; }
        static abstract string TypeName { get; }
        static abstract string TypeDescription { get; }
        static abstract string TypeDescriptions { get; }
    }
}
