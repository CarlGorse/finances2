import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { isYearAndPeriodSearchValid } from 'functions/YearAndPeriodFunctions'
import { loadedTransactionsState } from 'recoil/atoms/LoadedTransactionsAtom';
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountAtom';
import { transactionsPageNoState } from 'recoil/atoms/TransactionsPageNoAtom';
import { transactionsPageSizeState } from 'recoil/atoms/TransactionsPageSizeAtom';
import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchAtom';
import { reloadTransactionsState } from 'recoil/atoms/ReloadTransactionsAtom';
import { transactionLoadingProgressState } from 'recoil/atoms/TransactionLoadingProgressState';

function useLoadTransactions() {

  const pageCount = useRef(null);

  const reloadTransactions = useRecoilValue(reloadTransactionsState);
  const setLoadedTransactions = useSetRecoilState(loadedTransactionsState);
  const selectedBankAccount = useRecoilValue(selectedBankAccountState);
  const setTransactionLoadingProgressState = useSetRecoilState(transactionLoadingProgressState);
  const transactionsPageNo = useRecoilValue(transactionsPageNoState);
  const transactionsPageSize = useRecoilValue(transactionsPageSizeState);
  const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchState);

  useEffect(() => {

    if (!isYearAndPeriodSearchValid(yearAndPeriodSearch)
    ) {
      return () => { };
    }

    let model = GetLoadModel();

    if (!IsModelValid(model)) {
      return;
    }

    setTransactionLoadingProgressState("loading");

    axios.post(apiBaseUrl + "/transactions/get", model, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        setLoadedTransactions({
          pageCount: response.data.pageCount,
          transactions: response.data.transactions,
          totalTransactions: response.data.totalTransactions
        });
        setTransactionLoadingProgressState("loaded");
      })
      .catch(function () {
        pageCount.current = 0;
      })

    function GetLoadModel() {

      let model = {
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

      return model;
    }

    function IsModelValid(model) {

      if (!model) {
        return false;
      }

      if (!model.AccountId) {
        return false;
      }

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
}

export default useLoadTransactions;