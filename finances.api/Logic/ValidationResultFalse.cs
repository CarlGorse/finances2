namespace finances.api.Logic {

    public class ValidationResultFalse : IValidationResult {

        public string ValidationMessage { get; set; }

        public ValidationResultFalse(string context, string message) {
            ValidationMessage = $"{context}: {message}";
        }

        public bool IsValid => false;

    }
}
