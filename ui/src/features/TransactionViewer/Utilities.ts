export function getValidOperations(selectedTransactions) {
  let validOperations = [];

  validOperations.push("Add");

  if (selectedTransactions?.length > 0) {
    validOperations.push("Delete");
    switch (selectedTransactions.length) {
      case 1:
        validOperations.push("Edit");
        break;
      case 2:
        if (
          selectedTransactions.filter((x) => x.IsWage === true).length === 2 &&
          selectedTransactions[0].EffDate === selectedTransactions[1].EffDate
        ) {
          validOperations.push("Move wages");
        }
        break;
      default:
        break;
    }
  }
  return validOperations;
}
