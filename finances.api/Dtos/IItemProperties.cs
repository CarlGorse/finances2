namespace finances.api.Dtos
{
    public interface IItemProperties<T>
    {
        string DescriptionPlural { get; }
        string DescriptionSingle { get; }
        string Name { get; }
    }
}