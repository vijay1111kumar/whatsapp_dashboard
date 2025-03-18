import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLoanDetails, retryMessage } from "../api";

const LoanDetail = () => {
  const { loanId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getLoanDetails(loanId).then(setMessages);
  }, [loanId]);

  const handleRetry = async (messageId) => {
    await retryMessage(loanId, messageId);
    alert("Message retried!");
    getLoanDetails(loanId).then(setMessages);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Loan Messages - {loanId}</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Phone</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Retry</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={index}>
              <td className="border p-2">{msg.phone_no}</td>
              <td className="border p-2">{msg.message_name}</td>
              <td className="border p-2">{msg.message_type}</td>
              <td className="border p-2">{new Date(msg.timestamp * 1000).toLocaleString()}</td>
              <td className={`border p-2 ${msg.status === "sent" ? "text-green-600" : "text-red-600"}`}>
                {msg.status}
              </td>
              <td className="border p-2">
                {msg.status === "failed" && (
                  <button
                    onClick={() => handleRetry(index + 1)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Retry
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanDetail;
