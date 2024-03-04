namespace Finances.Engine.Logic.ValidationResult {

    public interface IValidationResult {

        public bool IsValid { get; }

        public string ValidationMessage { get; }
    }
}
