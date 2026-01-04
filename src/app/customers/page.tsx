import { JSX } from "react";

import { DataTable, Header } from "@/src/components";

const customers = [
  {
    name: "Rajesh Kumar",
    mobile: "+91 98765 43210",
    garlic: "2,450",
    peas: "1,250",
    outstanding: "₹45,230",
  },
  {
    name: "Priya Sharma",
    mobile: "+91 98765 43211",
    garlic: "3,120",
    peas: "2,340",
    outstanding: "₹12,500",
  },
  {
    name: "Amit Patel",
    mobile: "+91 98765 43212",
    garlic: "1,890",
    peas: "980",
    outstanding: "₹8,900",
  },
  {
    name: "Sunita Verma",
    mobile: "+91 98765 43213",
    garlic: "4,560",
    peas: "3,200",
    outstanding: "₹23,450",
  },
  {
    name: "Vikram Singh",
    mobile: "+91 98765 43214",
    garlic: "2,100",
    peas: "1,500",
    outstanding: "₹15,670",
  },
];

const CustomersPage = (): JSX.Element => {
  const rows = customers.map((customer) => [
    customer.name,
    customer.mobile,
    `${customer.garlic} kg`,
    `${customer.peas} kg`,
    customer.outstanding,
    <button
      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
      key={customer.mobile}
    >
      View
    </button>,
  ]);

  return (
    <div>
      <Header title="Customers" />
      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              className="w-full px-4 py-3 pl-12 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search customers..."
              type="text"
            />
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <DataTable
            headers={[
              "Customer Name",
              "Mobile",
              "Total Garlic (kg)",
              "Total Green Peas (kg)",
              "Outstanding",
              "Action",
            ]}
            rows={rows}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 1 to 5 of 142 customers</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
