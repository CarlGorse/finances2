import { padStart } from "functions/NumberFunctions";
import { useRecoilValue } from "recoil";
import { selectedBankAccountState } from "recoil/atoms/SelectedBankAccountState";
import { yearAndPeriodSearchState } from "recoil/atoms/YearAndPeriodSearchState";
import BankAccount from "types/BankAccount";
import YearAndPeriodSearch from "types/YearAndPeriodSearch";

export default function SearchCriteria() {
  const selectedBankAccount = useRecoilValue<BankAccount>(
    selectedBankAccountState,
  );
  const yearAndPeriodSearch = useRecoilValue<YearAndPeriodSearch>(
    yearAndPeriodSearchState,
  );

  return (
    <>
      <div>
        Bank account: <b>{selectedBankAccount?.Name}</b>
      </div>
      <div>
        From{" "}
        <b>
          {padStart(yearAndPeriodSearch.StartPeriod, 2, "0")}.
          {yearAndPeriodSearch.StartYear}
        </b>
        {" to "}
        <b>
          {padStart(yearAndPeriodSearch.EndPeriod, 2, "0")}.
          {yearAndPeriodSearch.EndYear}
        </b>
      </div>
    </>
  );
}
