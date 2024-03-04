namespace Finances.Engine.Data.Models.Interfaces {

    public interface IGettableItem<T> where T: class {
        int Id { get; set; }
    }
}
