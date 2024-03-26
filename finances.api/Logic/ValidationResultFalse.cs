namespace finances.api.Logic {

    public class ValidationResultFalse(string context, string message) : IValidationResult {

        public string ValidationMessage { get; set; } = $"{context}: {message}";

        public bool IsValid => false;

    }
}
