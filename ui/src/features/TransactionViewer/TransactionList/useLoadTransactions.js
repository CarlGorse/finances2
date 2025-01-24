import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { dateToLoadTransactionsState } from 'recoil/atoms/DateToLoadTransactionsState';
import { loadedTransactionsState } from 'recoil/atoms/LoadedTransactionsState';
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountState';
import { transactionsPageNoState } from 'recoil/atoms/TransactionsPageNoState';
import { transactionsPageSizeState } from 'recoil/atoms/TransactionsPageSizeState';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchState';

function useLoadTransactions() {

  const pageCount = useRef(null);

  const dateToLoadTransactions = useRecoilValue(dateToLoadTransactionsState);
  const selectedBankAccount = useRecoilValue(selectedBankAccountState);
  const transactionsPageNo = useRecoilValue(transactionsPageNoState);
  const transactionsPageSize = useRecoilValue(transactionsPageSizeState);
  const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchState);

  const setLoadedTransactions = useSetRecoilState(loadedTransactionsState);

  const [transactionLoadingProgress, setTransactionLoadingProgress] = useState("");

  useEffect(() => {

    let requestBody = getRequestBody();

    if (!isRequestBodyValid(requestBody)) {
      return;
    }

    setTransactionLoadingProgress("loading");

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
    dateToLoadTransactions,
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

    setTransactionLoadingProgress("loaded");
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

    if (!(dateToLoadTransactions instanceof Date) || isNaN(dateToLoadTransactions.valueOf())) {
      return false;
    }

    return true;
  }

  return transactionLoadingProgress;
}

export default useLoadTransactions;