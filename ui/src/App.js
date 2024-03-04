import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionsViewer from 'features/TransactionsViewer';
import NavBar from 'features/NavBar';

function App() {

  return (
    <BrowserRouter>

      <NavBar />

      <Routes>
        <Route exact path='/' element={<TransactionsViewer />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
