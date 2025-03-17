namespace finances2.api.Logic {

    public interface IValidationResult {

        public bool IsValid { get; }

        public string ValidationMessage { get; }
    }
}
