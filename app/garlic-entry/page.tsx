"use client";

import { useEffect, useState } from "react";
import { getData, saveData } from "../lib/storage";

export default function GarlicEntry() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [entries, setEntries] = useState<any[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [date, setDate] = useState("");
  const [qty, setQty] = useState("");
  const [rate, setRate] = useState("");

  const [editId, setEditId] = useState<number | null>(null); // 👈 NEW

  useEffect(() => {
    setCustomers(getData("customers"));
    setEntries(getData("garlicEntries"));
  }, []);

  const resetForm = () => {
    setCustomerId("");
    setDate("");
    setQty("");
    setRate("");
    setEditId(null);
  };

  // 🔹 ADD / UPDATE ENTRY
  const saveEntry = () => {
    if (!customerId || !qty || !rate || !date) return;

    const total = Number(qty) * Number(rate);
    let updated;

    if (editId) {
      // UPDATE
      updated = entries.map((e) =>
        e.id === editId ? { ...e, date, qty, rate, total } : e
      );
    } else {
      // ADD
      updated = [
        ...entries,
        {
          id: Date.now(),
          customerId: Number(customerId),
          date,
          qty,
          rate,
          total,
        },
      ];
    }

    setEntries(updated);
    saveData("garlicEntries", updated);
    resetForm();
  };

  // 🔹 START EDIT
  const startEdit = (entry: any) => {
    setEditId(entry.id);
    setCustomerId(String(entry.customerId));
    setDate(entry.date);
    setQty(entry.qty);
    setRate(entry.rate);
  };

  // 🔹 DELETE ENTRY
  const deleteEntry = (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveData("garlicEntries", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daily Garlic Entry</h2>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow max-w-xl mb-6 grid grid-cols-2 gap-3">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="Quantity (kg)"
          className="border p-2 rounded"
        />

        <input
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Rate / kg"
          className="border p-2 rounded"
        />

        <button
          onClick={saveEntry}
          className={`col-span-2 text-white py-2 rounded ${
            editId ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {editId ? "Update Entry" : "Save Entry"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow">
        <table className="w-full text-center">
          <thead className="bg-gray-200">
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Kg</th>
              <th>Rate</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => {
              const customer = customers.find((c) => c.id === e.customerId);

              return (
                <tr key={e.id} className="border-t">
                  <td>{e.date}</td>
                  <td>{customer?.name}</td>
                  <td>{e.qty}</td>
                  <td>₹{e.rate}</td>
                  <td>₹{e.total}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => startEdit(e)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEntry(e.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
