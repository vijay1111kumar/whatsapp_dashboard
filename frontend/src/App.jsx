import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoanTable from "./components/LoanTable";
import LoanDetail from "./components/LoanDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoanTable />} />
        <Route path="/loan/:loanId" element={<LoanDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
