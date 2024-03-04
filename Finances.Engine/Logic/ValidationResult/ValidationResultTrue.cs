namespace Finances.Engine.Logic.ValidationResult {

    public class ValidationResultTrue : IValidationResult {

        public string ValidationMessage { get; set; }

        public bool IsValid => true;

    }
}
