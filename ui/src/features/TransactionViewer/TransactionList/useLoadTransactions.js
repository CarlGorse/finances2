import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { dateToLoadTransactionsState } from "recoil/atoms/DateToLoadTransactionsState";
import { loadedTransactionsState } from "recoil/atoms/LoadedTransactionsState";
import { selectedBankAccountState } from "recoil/atoms/SelectedBankAccountState";
import { transactionsPageDataState } from "recoil/atoms/TransactionsPageDataState";
import { yearAndPeriodSearchState } from "recoil/atoms/YearAndPeriodSearchState";

function useLoadTransactions() {
  const pageCount = useRef(null);

  const dateToLoadTransactions = useRecoilValue(dateToLoadTransactionsState);
  const selectedBankAccount = useRecoilValue(selectedBankAccountState);
  const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchState);

  const setLoadedTransactions = useSetRecoilState(loadedTransactionsState);

  const [transactionsPageData, setTransactionsPageData] = useRecoilState(
    transactionsPageDataState,
  );
  const [transactionLoadingProgress, setTransactionLoadingProgress] =
    useState("");

  useEffect(() => {
    let requestBody = getRequestBody();

    if (!isRequestBodyValid(requestBody)) {
      return;
    }

    setTransactionLoadingProgress("loading");

    let requestUrl = process.env.REACT_APP_API_BASE_URL + "/transactions/get";
    let headers = { "Content-Type": "application/json" };

    axios
      .post(requestUrl, requestBody, {
        headers,
      })
      .then((response) => {
        onSuccesfulRequest(response);
      })
      .catch(function () {
        pageCount.current = 0;
      });
  }, [
    dateToLoadTransactions,
    selectedBankAccount,
    transactionsPageData,
    yearAndPeriodSearch,
  ]);

  function onSuccesfulRequest(response) {
    setLoadedTransactions(response.data);
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
      PageNo: transactionsPageData.PageNo,
      PageSize: transactionsPageData.PageSize,
      IncludeRunningTotals: true,
      IncludeWageTotals: true,
    };

    return model;
  }

  function isRequestBodyValid(model) {
    if (!model) {
      return false;
    }

    if (!model.AccountId) {
      return false;
    }

    if (
      !(dateToLoadTransactions instanceof Date) ||
      isNaN(dateToLoadTransactions.valueOf())
    ) {
      return false;
    }

    return true;
  }

  return transactionLoadingProgress;
}

export default useLoadTransactions;
