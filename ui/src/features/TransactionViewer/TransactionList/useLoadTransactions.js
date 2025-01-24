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
  const selectedBankAccount = useRecoilValue(selectedBankAccountState);
  const transactionsPageNo = useRecoilValue(transactionsPageNoState);
  const transactionsPageSize = useRecoilValue(transactionsPageSizeState);
  const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchState);

  const setLoadedTransactions = useSetRecoilState(loadedTransactionsState);
  const setTransactionLoadingProgressState = useSetRecoilState(transactionLoadingProgressState);

  useEffect(() => {

    let requestBody = getRequestBody();

    if (!isRequestBodyValid(requestBody)) {
      return;
    }

    setTransactionLoadingProgressState("loading");

    let requestUrl = apiBaseUrl + "/transactions/get";
    let headers = { "Content-Type": "application/json" };

    axios.post(
      requestUrl,
      requestBody, {
      headers
    })
      .then(response => {
        onSuccesfulRequest(response)
      })
      .catch(function () {
        pageCount.current = 0;
      })
  }, [
    reloadTransactions,
    selectedBankAccount,
    transactionsPageNo,
    transactionsPageSize,
    yearAndPeriodSearch
  ])

  function onSuccesfulRequest(response) {

    setLoadedTransactions({
      pageCount: response.data.pageCount,
      transactions: response.data.transactions,
      totalTransactions: response.data.totalTransactions
    });

    setTransactionLoadingProgressState("loaded");
  }

  function getRequestBody() {

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

  function isRequestBodyValid(model) {

    if (!model) {
      return false;
    }

    if (!model.AccountId) {
      return false;
    }

    if (!model.PageSize > 0) {
      return false;
    }

    if (!(reloadTransactions instanceof Date) || isNaN(reloadTransactions.valueOf())) {
      return false;
    }

    return true;
  }
}

export default useLoadTransactions;