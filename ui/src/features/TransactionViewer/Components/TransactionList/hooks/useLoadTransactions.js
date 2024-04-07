import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { isYearAndPeriodSearchValid } from 'functions/YearAndPeriodFunctions'
import { loadedTransactionsAtom } from "recoil/atoms/LoadedTransactionsAtom";
import { selectedBankAccountAtom } from "recoil/atoms/SelectedBankAccountAtom";
import { transactionsPageSizeAtom } from "recoil/atoms/TransactionsPageSizeAtom";
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { yearAndPeriodSearchAtom } from 'recoil/atoms/YearAndPeriodSearchAtom';

function useLoadTransactions() {

  const pageCount = useRef(1);

  const [pageNo] = useState(1);
  const setLoadedTransactions = useSetRecoilState(loadedTransactionsAtom);
  const selectedBankAccount = useRecoilValue(selectedBankAccountAtom);
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
      .catch(function (error) {
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
        PageNo: pageNo,
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

      return true;
    }
  }, [pageNo, selectedBankAccount, yearAndPeriodSearch, setLoadedTransactions, transactionsPageSize])

  return pageCount.current;
}

export default useLoadTransactions;