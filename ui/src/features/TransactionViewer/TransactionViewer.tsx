import axios from 'axios'
import BankAccount from 'types/BankAccount'
import SearchSidebar from './SearchSidebar/SearchSidebar'
import TransactionBanner from './TransactionBanner/TransactionBanner'
import TransactionList from './TransactionList/TransactionList';
import TransactionOperationSidebar from './OperationsSidebar/OperationsSidebar'

import { apiBaseUrl } from 'consts/ApiConsts';
import { bankAccountsState } from 'recoil/atoms/BankAccountsAtom';
import { categoriesState } from 'recoil/atoms/CategoriesAtom';
import { Container } from 'react-bootstrap';
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountAtom';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationState';
import { sortCategories } from 'functions/CategoryFunctions'
import { useEffect } from 'react'
import { userMessageState } from 'recoil/atoms/UserMessageAtom';
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
      <TransactionOperationSidebar />

      <SearchSidebar />

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
      validOperations.push("Delete");
    } else {
      validOperations.push("Add");
    }
    return validOperations;
  }
}
