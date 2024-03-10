import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from 'features/NavBar';
import { RecoilRoot } from "recoil";
import TransactionViewer from 'features/TransactionViewer/TransactionViewer';

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>

        <NavBar />

        <Routes>
          <Route exact path='/' element={<TransactionViewer />} />
        </Routes>

      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
