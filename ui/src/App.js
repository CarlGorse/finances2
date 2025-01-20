import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryTotalsReport from 'features/CategoryTotalsReport/CategoryTotalsReport'
import FinancesNavbar from 'features/FinancesNavbar/FinancesNavbar';
import { RecoilRoot } from 'recoil';
import TransactionViewer from 'features/TransactionViewer/TransactionViewer';

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>

        <FinancesNavbar />

        <Routes>
          <Route path='/' element={<TransactionViewer />} />
          <Route path='/transactions' element={<TransactionViewer />} />
          <Route path='/category-totals-report' element={<CategoryTotalsReport />} />
        </Routes>

      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
