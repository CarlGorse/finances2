import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios'
import { bankAccountsState } from 'recoil/atoms/BankAccountsAtom';
import { categoriesState } from 'recoil/atoms/CategoriesAtom';
import { Container } from 'react-bootstrap';
import { sortCategories } from 'functions/CategoryFunctions'
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountAtom';
import TransactionBanner from './TransactionBanner'
import TransactionList from './TransactionList';
import { transactionsPageNoState } from 'recoil/atoms/TransactionsPageNoAtom';
import { userMessageState } from 'recoil/atoms/UserMessageAtom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react'
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchAtom';
import YearAndPeriodSearch from 'types/YearAndPeriodSearch'
import BankAccount from 'types/BankAccount'

function TransactionViewer() {

  const setBankAccounts = useSetRecoilState<BankAccount>(bankAccountsState);
  const setCategories = useSetRecoilState(categoriesState);
  const setSelectedBankAccount = useSetRecoilState<BankAccount>(selectedBankAccountState);
  const setTransactionPageNo = useSetRecoilState(transactionsPageNoState);
  const setUserMessage = useSetRecoilState(userMessageState);
  const setYearAndPeriodSearch = useSetRecoilState<YearAndPeriodSearch>(yearAndPeriodSearchState);

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

  useEffect(() => {

    setTransactionPageNo(1);

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    setYearAndPeriodSearch({
      StartPeriod: currentMonth,
      StartYear: currentYear,
      EndPeriod: currentMonth,
      EndYear: currentYear
    });

  }, [setTransactionPageNo, setYearAndPeriodSearch])
  /*
    useEffect(() => {
      if (transactionOperation) {
        //setShow(true);
      }
    }, [transactionOperation])
  */

  return (

    <Container>

      <div style={{ position: "sticky", top: "3em", backgroundColor: "white", zIndex: "1" }} >
        <TransactionBanner />
      </div>

      <div className="mt-3">
        <TransactionList />
      </div>

    </Container >
  )
}

export default TransactionViewer;