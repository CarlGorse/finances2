namespace finances2.api.Logic {

    public class ValidationResultTrue : IValidationResult {

        public string ValidationMessage { get; set; }

        public bool IsValid => true;

    }
}
