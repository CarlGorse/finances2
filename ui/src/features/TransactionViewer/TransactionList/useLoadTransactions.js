import { apiBaseUrl } from 'common/consts/ApiConsts';
import axios from 'axios';
import { isYearAndPeriodSearchValid } from 'common/functions/YearAndPeriodFunctions'
import { loadedTransactionsAtom } from 'common/recoil/atoms/LoadedTransactionsAtom';
import { selectedBankAccountAtom } from 'common/recoil/atoms/SelectedBankAccountAtom';
import { transactionsPageNoAtom } from 'common/recoil/atoms/TransactionsPageNoAtom';
import { transactionsPageSizeAtom } from 'common/recoil/atoms/TransactionsPageSizeAtom';
import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';
import { reloadTransactionsAtom } from 'common/recoil/atoms/ReloadTransactionsAtom';

function useLoadTransactions() {

  const pageCount = useRef(1);

  const reloadTransactions = useRecoilValue(reloadTransactionsAtom);
  const setLoadedTransactions = useSetRecoilState(loadedTransactionsAtom);
  const selectedBankAccount = useRecoilValue(selectedBankAccountAtom);
  const transactionsPageNo = useRecoilValue(transactionsPageNoAtom);
  const transactionsPageSize = useRecoilValue(transactionsPageSizeAtom);
  const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchAtom);

  useEffect(() => {

    if (!isYearAndPeriodSearchValid(yearAndPeriodSearch)
    ) {
      return () => { };
    }

    let model = GetLoadModel();

    if (!IsModelValid(model)) {
      return;
    }

    axios.post(apiBaseUrl + "/transactions/get", model, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        setLoadedTransactions({
          pageCount: response.data.PageCount,
          transactions: response.data.transactions
        });
      })
      .catch(function () {
        pageCount.current = 0;
      })

    function GetLoadModel() {

      return {
        AccountId: selectedBankAccount.AccountId,
        YearAndPeriodSearch: {
          StartYear: yearAndPeriodSearch.StartYear,
          StartPeriod: yearAndPeriodSearch.StartPeriod,
          EndYear: yearAndPeriodSearch.EndYear,
          EndPeriod: yearAndPeriodSearch.EndPeriod,
        },
        PageNo: transactionsPageNo,
        PageSize: transactionsPageSize,
        IncludeRunningTotals: true,
        IncludeWageTotals: true
      }
    }

    function IsModelValid(model) {

      if (!model.PageSize > 0) {
        return false;
      }

      if (model.YearAndPeriodSearch.EndYear < model.YearAndPeriodSearch.StartYear) {
        return false;
      }

      if ((model.YearAndPeriodSearch.EndYear === model.YearAndPeriodSearch.StartYear)
        && model.YearAndPeriodSearch.EndPeriod < model.YearAndPeriodSearch.StartPeriod) {
        return false;
      }

      if (!(reloadTransactions instanceof Date) || isNaN(reloadTransactions.valueOf())) {
        return false;
      }

      return true;
    }
  }, [selectedBankAccount,
    setLoadedTransactions,
    transactionsPageNo,
    transactionsPageSize,
    yearAndPeriodSearch,
    reloadTransactions])

  return pageCount.current;
}

export default useLoadTransactions;