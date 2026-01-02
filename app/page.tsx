"use client";

import { useEffect, useState } from "react";
import { getData } from "./lib/storage";

export default function Dashboard() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [entries, setEntries] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    setCustomers(getData("customers"));
    setEntries(getData("garlicEntries"));
    setPayments(getData("payments"));
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const todayEntries = entries.filter((e) => e.date === today);

  const monthEntries = entries.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalMonthAmount = monthEntries.reduce(
    (sum, e) => sum + Number(e.total),
    0
  );

  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  const outstanding = totalMonthAmount - totalPaid;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Customers" value={customers.length} />
        <Card title="Today's Entries" value={todayEntries.length} />
        <Card title="Month Total" value={`₹${totalMonthAmount}`} />
        <Card title="Outstanding" value={`₹${outstanding}`} danger />
      </div>
    </div>
  );
}

function Card({ title, value, danger }: any) {
  return (
    <div className={`p-4 rounded shadow bg-white ${danger && "text-red-600"}`}>
      <p className="text-sm">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}
