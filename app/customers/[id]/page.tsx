"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getData } from "@/app/lib/storage";

export default function CustomerLedger() {
  const params = useParams();
  const id = params.id; // ✅ SAFE

  const [customer, setCustomer] = useState<any>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const customers = getData("customers");
    const allEntries = getData("garlicEntries");
    const allPayments = getData("payments");

    setCustomer(customers.find((c: any) => Number(c.id) === Number(id)));

    setEntries(
      allEntries.filter((e: any) => Number(e.customerId) === Number(id))
    );

    setPayments(
      allPayments.filter((p: any) => Number(p.customerId) === Number(id))
    );
  }, [id]);

  const totalTaken = entries.reduce((s, e) => s + Number(e.total), 0);
  const totalPaid = payments.reduce((s, p) => s + Number(p.amount), 0);
  const pending = totalTaken - totalPaid;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{customer?.name} Ledger</h2>

      <div className="mb-4 space-y-1">
        <p>Total Amount: ₹{totalTaken}</p>
        <p>Paid: ₹{totalPaid}</p>
        <p className="text-red-600 font-semibold">Pending: ₹{pending}</p>
      </div>

      {/* Garlic Entries */}
      <h3 className="font-semibold mb-2">Garlic Entries</h3>
      <table className="w-full bg-white shadow mb-6 text-center">
        <thead className="bg-gray-200">
          <tr>
            <th>Date</th>
            <th>Kg</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id} className="border-t">
              <td>{e.date}</td>
              <td>{e.qty}</td>
              <td>₹{e.rate}</td>
              <td>₹{e.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Payments */}
      <h3 className="font-semibold mb-2">Payments</h3>
      <table className="w-full bg-white shadow text-center">
        <thead className="bg-gray-200">
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td>{p.date}</td>
              <td>₹{p.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
