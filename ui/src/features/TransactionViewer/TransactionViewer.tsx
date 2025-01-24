import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios'
import { bankAccountsState } from 'recoil/atoms/BankAccountsAtom';
import { categoriesState } from 'recoil/atoms/CategoriesAtom';
import { Container } from 'react-bootstrap';
import { sortCategories } from 'functions/CategoryFunctions'
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountAtom';
import TransactionBanner from './TransactionBanner/TransactionBanner'
import TransactionList from './TransactionList';
import { userMessageState } from 'recoil/atoms/UserMessageAtom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react'
import BankAccount from 'types/BankAccount'
import SearchSidebar from './SearchSidebar'
import TransactionOperationSidebar from './TransactionOperationsSidebar'

export default function TransactionViewer() {

  const setBankAccounts = useSetRecoilState<BankAccount[]>(bankAccountsState);
  const setCategories = useSetRecoilState(categoriesState);
  const setSelectedBankAccount = useSetRecoilState<BankAccount>(selectedBankAccountState);
  const setUserMessage = useSetRecoilState(userMessageState);

  useEffect(() => {
    axios.get(apiBaseUrl + '/categories/get')
      .then(function (response) {
        let sortedCategories = sortCategories([...response.data]);
        setCategories(sortedCategories)
      })
  }, [])

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
}
