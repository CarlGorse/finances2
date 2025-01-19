import { apiBaseUrl } from 'common/consts/ApiConsts';
import axios from 'axios'
import { categoriesAtom } from 'common/recoil/atoms/CategoriesAtom';
import { Container } from 'react-bootstrap';
import { sortCategories } from 'common/functions/CategoryFunctions'
import TransactionBanner from './TransactionBanner'
import TransactionList from './TransactionList';
import { transactionsPageNoAtom } from 'common/recoil/atoms/TransactionsPageNoAtom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react'
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';
import YearAndPeriodSearch from 'types/YearAndPeriodSearch'

function TransactionViewer() {

  const setTransactionPageNo = useSetRecoilState(transactionsPageNoAtom);
  const setYearAndPeriodSearch = useSetRecoilState<YearAndPeriodSearch>(yearAndPeriodSearchAtom);
  const setCategories = useSetRecoilState(categoriesAtom);

  useEffect(() => {
    axios.get(apiBaseUrl + '/categories/get')
      .then(function (response) {
        alert(response.data);
        let sortedCategories = sortCategories([...response.data]);
        setCategories(sortedCategories)
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