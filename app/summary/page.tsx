"use client";

import { useEffect, useState } from "react";
import { getData } from "../lib/storage";

export default function Summary() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [entries, setEntries] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    setCustomers(getData("customers"));
    setEntries(getData("garlicEntries"));
    setPayments(getData("payments"));
  }, []);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const getCustomerSummary = (customerId: number) => {
    const monthEntries = entries.filter((e) => {
      const d = new Date(e.date);
      return (
        Number(e.customerId) === Number(customerId) &&
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    });

    const totalKg = monthEntries.reduce((s, e) => s + Number(e.qty), 0);

    const totalAmount = monthEntries.reduce((s, e) => s + Number(e.total), 0);

    const totalPaid = payments
      .filter((p) => {
        if (Number(p.customerId) !== Number(customerId)) return false;
        if (!p.date) return true;

        const d = new Date(p.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((s, p) => s + Number(p.amount), 0);

    return {
      totalKg,
      totalAmount,
      totalPaid,
      pending: totalAmount - totalPaid,
    };
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Monthly Summary</h2>

      <table className="w-full bg-white rounded shadow text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Customer</th>
            <th className="p-2">Total KG</th>
            <th className="p-2">Total Amount</th>
            <th className="p-2">Paid</th>
            <th className="p-2">Pending</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => {
            const s = getCustomerSummary(c.id);

            return (
              <tr key={c.id} className="border-t">
                <td className="p-2 font-medium">{c.name}</td>
                <td className="p-2">{s.totalKg}</td>
                <td className="p-2">₹{s.totalAmount}</td>
                <td className="p-2">₹{s.totalPaid}</td>
                <td className="p-2 text-red-600">₹{s.pending}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
