import { useState, useEffect } from "react";
import { getLoans } from "../api";
import { useNavigate } from "react-router-dom";

const LoanTable = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLoans().then(setLoans);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Loan Overview</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Loan ID</th>
            <th className="border p-2">Last Message</th>
            <th className="border p-2">Success</th>
            <th className="border p-2">Fail</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan.loan_id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/loan/${loan.loan_id}`)}
            >
              <td className="border p-2">{loan.loan_id}</td>
              <td className="border p-2">{loan.last_sent_message}</td>
              <td className="border p-2 text-green-600">{loan.success}</td>
              <td className="border p-2 text-red-600">{loan.fail}</td>
              <td className="border p-2">{loan.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;
