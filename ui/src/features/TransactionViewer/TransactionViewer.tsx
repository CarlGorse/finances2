import axios from 'axios'
import BankAccount from 'types/BankAccount'
import TransactionBanner from './TransactionBanner/TransactionBanner'
import TransactionList from './TransactionList/TransactionList';

import { apiBaseUrl } from 'consts/ApiConsts';
import { bankAccountsState } from 'recoil/atoms/BankAccountsState';
import { categoriesState } from 'recoil/atoms/CategoriesState';
import { Container } from 'react-bootstrap';
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountState';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsState';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationState';
import { sortCategories } from 'functions/CategoryFunctions'
import { useEffect } from 'react'
import { userMessageState } from 'recoil/atoms/UserMessageState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { validTransactionOperationsState } from 'recoil/atoms/ValidTransactionOperationsState';

export default function TransactionViewer() {

  const selectedTransactions = useRecoilValue(selectedTransactionsState);
  const transactionOperation = useRecoilValue(transactionOperationState);

  const setBankAccounts = useSetRecoilState<BankAccount[]>(bankAccountsState);
  const setCategories = useSetRecoilState(categoriesState);
  const setSelectedBankAccount = useSetRecoilState<BankAccount>(selectedBankAccountState);
  const setUserMessage = useSetRecoilState(userMessageState);
  const setTransactionOperation = useSetRecoilState(transactionOperationState);
  const setValidTransactionOperations = useSetRecoilState(validTransactionOperationsState);

  useEffect(() => {
    axios.get(apiBaseUrl + '/categories/get')
      .then(function (response) {
        let sortedCategories = sortCategories([...response.data]);
        setCategories(sortedCategories)
      })
  }, [])

  useEffect(() => {
    let validOperations = getValidOperations();
    setValidTransactionOperations(validOperations);

    if (!validOperations.includes(transactionOperation)) {
      setTransactionOperation(null);
    }

  }, [selectedTransactions])

  useEffect(() => {

    axios.get(apiBaseUrl + "/bankAccounts/get")
      .then(response => {

        let bankAccounts = response.data.Accounts;
        setBankAccounts(bankAccounts);

        const bankAccountId_Natwest = 7
        let bankAccount = bankAccounts.find(bankAccount => bankAccount.AccountId === bankAccountId_Natwest);
        setSelectedBankAccount(bankAccount);
      })
      .catch((response) => {
        setUserMessage({
          Message: "Unable to load bank accounts", Variant: "danger"
        })
      })
  }, [])

  return (
    <>
      <Container>

        <div style={{ position: "sticky", top: "3em", backgroundColor: "white", zIndex: "1" }} >
          <TransactionBanner />
        </div>

        <div className="mt-3">
          <TransactionList />
        </div>

      </Container >

    </>
  )

  function getValidOperations() {

    let validOperations = [];

    validOperations.push("Add");
    validOperations.push("Delete");

    if (selectedTransactions?.length > 0) {
      switch (selectedTransactions.length) {
        case 1:
          validOperations.push("Edit");
          break;
        case 2:
          if ((selectedTransactions.filter(x => x.IsWage === true).length === 2)
            && (selectedTransactions[0].EffDate === selectedTransactions[1].EffDate)) {
            validOperations.push("Move wages");
          }
          break;
        default:
          break;
      }
    }
    return validOperations;
  }
}
