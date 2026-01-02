"use client";

import { useEffect, useState } from "react";
import { getData, saveData } from "../lib/storage";

export default function Payments() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setCustomers(getData("customers"));
    setPayments(getData("payments"));
  }, []);

  const addPayment = () => {
    if (!customerId || !amount) return;

    const newPayment = {
      id: Date.now(),
      customerId: Number(customerId),
      amount,
      date: new Date().toISOString().slice(0, 10), // ✅ FIX
    };

    const updated = [...payments, newPayment];
    setPayments(updated);
    saveData("payments", updated);

    setAmount("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payments</h2>

      <div className="bg-white p-4 rounded shadow max-w-md">
        <select
          className="border p-2 w-full mb-2"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={addPayment}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Add Payment
        </button>
      </div>
    </div>
  );
}
