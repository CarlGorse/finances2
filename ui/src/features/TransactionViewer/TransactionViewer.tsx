import { apiBaseUrl } from 'common/consts/ApiConsts';
import axios from 'axios'
import { bankAccountsAtom } from 'common/recoil/atoms/BankAccountsAtom';
import { categoriesAtom } from 'common/recoil/atoms/CategoriesAtom';
import { Container } from 'react-bootstrap';
import { sortCategories } from 'common/functions/CategoryFunctions'
import { selectedBankAccountAtom } from 'common/recoil/atoms/SelectedBankAccountAtom';
import TransactionBanner from './TransactionBanner'
import TransactionList from './TransactionList';
import { transactionsPageNoAtom } from 'common/recoil/atoms/TransactionsPageNoAtom';
import { userMessageAtom } from 'common/recoil/atoms/UserMessageAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react'
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';
import YearAndPeriodSearch from 'types/YearAndPeriodSearch'
import BankAccount from 'types/BankAccount'

function TransactionViewer() {

  const [bankAccounts, setBankAccounts] = useRecoilState<BankAccount>(bankAccountsAtom);
  const setCategories = useSetRecoilState(categoriesAtom);
  const setSelectedBankAccount = useSetRecoilState<BankAccount>(selectedBankAccountAtom);
  const setTransactionPageNo = useSetRecoilState(transactionsPageNoAtom);
  const setUserMessage = useSetRecoilState(userMessageAtom);
  const setYearAndPeriodSearch = useSetRecoilState<YearAndPeriodSearch>(yearAndPeriodSearchAtom);

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