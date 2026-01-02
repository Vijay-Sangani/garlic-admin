"use client";

import { useEffect, useState } from "react";
import { getData, saveData } from "../lib/storage";
import Link from "next/link";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    setCustomers(getData("customers"));
  }, []);

  const resetForm = () => {
    setName("");
    setMobile("");
    setEditId(null);
  };

  // 🔹 ADD / UPDATE CUSTOMER
  const saveCustomer = () => {
    if (!name) return;

    let updated;

    if (editId) {
      // UPDATE
      updated = customers.map((c) =>
        c.id === editId ? { ...c, name, mobile } : c
      );
    } else {
      // ADD
      updated = [
        ...customers,
        {
          id: Date.now(),
          name,
          mobile,
        },
      ];
    }

    setCustomers(updated);
    saveData("customers", updated);
    resetForm();
  };

  // 🔹 START EDIT
  const startEdit = (customer: any) => {
    setEditId(customer.id);
    setName(customer.name);
    setMobile(customer.mobile);
  };

  // 🔹 SAFE DELETE CUSTOMER
  const deleteCustomer = (id: number) => {
    const entries = getData("garlicEntries");
    const payments = getData("payments");

    const hasEntries = entries.some(
      (e: any) => Number(e.customerId) === Number(id)
    );
    const hasPayments = payments.some(
      (p: any) => Number(p.customerId) === Number(id)
    );

    if (hasEntries || hasPayments) {
      alert("This customer has entries or payments. Delete not allowed.");
      return;
    }

    if (!confirm("Delete this customer?")) return;

    const updated = customers.filter((c) => c.id !== id);
    setCustomers(updated);
    saveData("customers", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers</h2>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow max-w-md mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Customer Name"
          className="border p-2 rounded w-full mb-2"
        />
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile"
          className="border p-2 rounded w-full mb-2"
        />

        <button
          onClick={saveCustomer}
          className={`text-white px-4 py-2 rounded w-full ${
            editId ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {editId ? "Update Customer" : "Add Customer"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Mobile</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-2 text-blue-600 underline">
                  <Link href={`/customers/${c.id}`}>{c.name}</Link>
                </td>
                <td className="p-2">{c.mobile}</td>
                <td className="p-2 text-center space-x-2">
                  <button
                    onClick={() => startEdit(c)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCustomer(c.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
