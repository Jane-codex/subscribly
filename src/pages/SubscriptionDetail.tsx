import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { subscriptionsData } from "../subscriptions";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, Download, Eye, Trash2, ArrowUpRight, ChartLine, FileChartColumn, ArrowDown, Home, X } from "lucide-react";

export default function SubscriptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sub = subscriptionsData.find((s) => s.id === Number(id));

  if (!sub) return <div className="text-white p-10">Subscription not found</div>;

  const [isModalOpen, setIsModalOpen] = useState(false);
const [isActive, setIsActive] = useState(true); 
const confirmDeactivation = () => {
  setIsActive(false);
  setIsModalOpen(false);
};

interface Transaction {
  id: string;
  amount: string;
  date: string;
  status: 'Success' | 'Processing' | 'Declined';
}

const [selectedInvoice, setSelectedInvoice] = useState<Transaction | null>(null);
const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const transactions = [
    { id: "INV-3056", amount: "N7,021.23", date: "Dec 13, 2023", status: "Processing" },
    { id: "INV-3076", amount: "N7,021.23", date: "Nov 13, 2023", status: "Success" },
    { id: "INV-3006", amount: "N7,021.23", date: "Oct 13, 2023", status: "Success" },
    { id: "INV-3064", amount: "N7,021.23", date: "Sep 13, 2023", status: "Declined" },
    { id: "INV-3026", amount: "N7,021.23", date: "Aug 12, 2023", status: "Success" },
    { id: "INV-3061", amount: "N7,021.23", date: "Jul 12, 2023", status: "Success" },
  ];


const filteredTransactions = transactions.filter((tx) => {
  const matchesSearch = tx.id.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
  return matchesSearch && matchesStatus;
});

const handleExport = () => {
   const headers = ["Invoice ID", "Amount", "Delivery Date", "Status"];
  const rows = filteredTransactions.map(tx => [
    tx.id,
    tx.amount.replace("N", ""), // Remove the currency symbol for cleaner data
    tx.date,
    tx.status
  ]);

  const csvContent = [
    headers.join(","), 
    ...rows.map(row => row.join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${sub.name}_billing_history.csv`); 
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const [selectedIds, setSelectedIds] = useState<string[]>([]);
const toggleSelect = (id: string) => {
  setSelectedIds((prev) => {
    if (prev.includes(id)) {
      return prev.filter((item) => item !== id);
    } else {
      return [...prev, id];
    }
  });
};

const toggleSelectAll = () => {
  if (selectedIds.length === filteredTransactions.length) {
    setSelectedIds([]);
  } else {
    setSelectedIds(filteredTransactions.map((tx) => tx.id));
  }
};

 
const handleDownload = (tx: Transaction) => {
  console.log("Downloading invoice for:", tx.id);
  alert(`Downloading Invoice ${tx.id}...`);
};

const handleDeleteTransaction = (id: string) => {
  console.log("Deleting transaction:", id);
  const confirmDelete = window.confirm("Are you sure you want to delete this record?");
  if (confirmDelete) {
  }
};
console.log("Currently Selected IDs:", selectedIds);
 
    return (
  <div className="p-4 md:p-8 bg-black min-h-screen text-white">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-slate-500">
        <span className="cursor-pointer hover:text-white" onClick={() => navigate("/dashboard")}>
          <Home size={18} />
        </span>
        <span>&gt;</span>
        <span className="cursor-pointer hover:text-white" onClick={() => navigate("/subscriptions")}>
          Subscription
        </span>
        <span>&gt;</span>
        <span className="hidden sm:inline">...</span>
        <span className="sm:hidden">&gt;</span>
        <span className="text-red-600 font-bold">{sub.name}</span>
      </div>

      {isActive ? (
        <div className="bg-[#2A1B05] border border-[#7C5D1A] text-[#F2C94C] px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs flex items-center gap-2 animate-in fade-in slide-in-from-right duration-300">
          Next Due Payment: 29th Jan 2025
          <span className="bg-[#7C5D1A] text-white px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
            Warning <ArrowUpRight size={12} />
          </span>
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 text-slate-500 px-4 py-2 rounded-full text-xs italic flex items-center gap-2">
          Subscription Paused
        </div>
      )}
    </div>

    <h1 className="text-2xl md:text-3xl font-bold mb-1">Subscription</h1>
    <p className="text-slate-400 text-xs md:text-sm mb-8">Manage all subscription plans</p>
    <div className="bg-[#0B0B0B] border border-slate-900 rounded-[20px] p-4 md:p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      <div className="flex items-center gap-4">
        <img src={sub.logo} alt={sub.name} className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-lg" />
        <div>
          <h2 className="text-lg md:text-xl font-bold">{sub.name}</h2>
          <p className="text-slate-500 text-xs md:text-sm">{sub.desc}</p>
          <div className="flex flex-wrap gap-3 md:gap-4 mt-2 text-[10px] md:text-xs text-slate-400">
            <span>💳 #30,000</span>
            <span>🕒 25th / month</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full sm:w-auto gap-3">
        {isActive ? (
          <span className="bg-[#E6F4EA] text-[#1E7E34] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E7E34]" /> Active
          </span>
        ) : (
          <span className="bg-[#F2F4F7] text-[#344054] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-[#D0D5DD]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#344054]" /> Deactivated
          </span>
        )}
        <Switch
          checked={isActive}
          onCheckedChange={(checked) => (checked ? setIsActive(true) : setIsModalOpen(true))}
          className="data-[state=checked]:bg-[#D92D20] data-[state=unchecked]:bg-[#667085]"
        />
      </div>
    </div>

    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 transition-all duration-500 ${!isActive ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
      <div className="bg-[#0B0B0B] border border-slate-900 p-6 md:p-8 rounded-[24px] relative overflow-hidden">
        <p className="text-slate-500 text-xs md:text-sm flex items-center gap-2 mb-2">
          <ChartLine size={18} /> Total Amount Paid
        </p>
        <h3 className="text-2xl md:text-3xl font-bold font-krona"># 57,000</h3>
        <span className="absolute top-4 right-4 text-slate-800 opacity-50 md:opacity-100">
          <FileChartColumn size={20} />
        </span>
      </div>
      <div className="bg-[#0B0B0B] border border-slate-900 p-6 md:p-8 rounded-[24px] relative overflow-hidden">
        <p className="text-slate-500 text-xs md:text-sm flex items-center gap-2 mb-2">
          <ChartLine size={18} /> Total Number of Payments
        </p>
        <h3 className="text-2xl md:text-3xl font-bold font-krona">9</h3>
        <span className="absolute top-4 right-4 text-slate-800 opacity-50 md:opacity-100">
          <FileChartColumn size={20} />
        </span>
      </div>
    </div>

    <div className="bg-[#0B0B0B] border border-slate-900 rounded-[24px] overflow-hidden">
      <div className="p-4 md:p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 border-b border-slate-900">
        <h3 className="text-lg md:text-xl font-bold">Transaction History</h3>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <Input
              placeholder="Search..."
              className="bg-black border-slate-800 pl-10 w-full h-10 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-40">
              <select
                className="w-full bg-black border border-slate-800 text-slate-300 text-sm rounded-md px-3 py-2 pr-10 appearance-none focus:ring-1 focus:ring-slate-700 outline-none h-10"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">Category</option>
                <option value="Success">Success</option>
                <option value="Processing">Processing</option>
                <option value="Declined">Declined</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown size={16} />
              </div>
            </div>
            <Button onClick={handleExport} className="bg-white text-black font-bold px-4 h-10 flex-1 sm:flex-none">
              <Download className="rotate-180" size={16} /> <span className="ml-2">Export</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
  <table className="w-full text-left min-w-[800px] border-collapse">
    <thead className="text-slate-500 text-[10px] md:text-xs font-medium border-b border-slate-900 tracking-wider">
      <tr>
        <th className="p-4 w-12 text-center">
          <div 
            onClick={toggleSelectAll}
            className={`w-5 h-5 border rounded-md flex items-center justify-center cursor-pointer transition-all ${
              selectedIds.length === filteredTransactions.length && filteredTransactions.length > 0
                ? "border-red-600 bg-red-600 text-white" 
                : "border-red-600/50 bg-red-600/10 text-red-600"
            }`}
          >
            <span className="text-xs font-bold">
              {selectedIds.length === filteredTransactions.length ? "✓" : "-"}
            </span>
          </div>
        </th>

        <th className="p-4 w-full">Invoice</th>
        <th className="p-4 text-right whitespace-nowrap">Order amount</th>
        <th className="p-4 text-right whitespace-nowrap">
          <div className="flex items-center justify-end gap-1">
            Delivery date <ArrowDown size={14}/>
          </div>
        </th>
        <th className="p-4 text-right whitespace-nowrap">Status</th>
        <th className="p-4 w-28 text-right"></th>
      </tr>
    </thead>

    <tbody className="text-sm">
     {filteredTransactions.map((tx) => ( 
  <tr key={tx.id} className="border-b border-slate-900/50 hover:bg-white/[0.02] transition-colors">
          <td className="p-4 text-center">
            <div 
              onClick={() => toggleSelect(tx.id)}
              className={`w-5 h-5 border rounded-md flex items-center justify-center cursor-pointer transition-all ${
                selectedIds.includes(tx.id)
                  ? "border-red-600 bg-red-600 text-white" 
                  : "border-red-600/50 bg-red-600/10"
              }`}
            >
{selectedIds.includes(tx.id) && (
  <span className="text-white text-[10px] font-bold">✓</span>
)}
            </div>
          </td>

          <td className="p-4 text-white font-medium whitespace-nowrap">{tx.id}</td>
          <td className="p-4 text-slate-400 text-right whitespace-nowrap">{tx.amount}</td>
          <td className="p-4 text-slate-400 text-right whitespace-nowrap">{tx.date}</td>
          
          <td className="p-4">
            <div className="flex justify-end">
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 border whitespace-nowrap
                ${tx.status === 'Success' ? 'bg-[#E6F4EA] text-[#1E7E34] border-[#B7E1C1]' : 
                  tx.status === 'Declined' ? 'bg-[#FDE8E8] text-[#C81E1E] border-[#F8B4B4]' : 
                  'bg-white text-black border-slate-300'}`}>
                <span className={`w-1 h-1 rounded-full ${tx.status === 'Success' ? 'bg-[#1E7E34]' : 'bg-[#C81E1E]'}`} />
                {tx.status}
              </span>
            </div>
          </td>

          <td className="p-4">
            <div className="flex gap-4 text-slate-500 justify-end">
              <Eye 
                size={18} 
                className={`transition-all ${tx.status === 'Success' ? "cursor-pointer hover:text-white" : "cursor-not-allowed opacity-20"}`}
                onClick={() => {
                  if (tx.status === 'Success') {
                    setSelectedInvoice(tx as Transaction);
                    setIsInvoiceOpen(true);
                  }
                }}
              />
              <Download 
                size={18} 
                className={`transition-all ${tx.status === 'Success' ? "cursor-pointer hover:text-white" : "cursor-not-allowed opacity-20"}`}
                onClick={() => {
                  if (tx.status === 'Success') handleDownload(tx as Transaction);
                }} 
              />
              <Trash2
                size={18} 
                className="cursor-pointer hover:text-red-500 transition-colors" 
                onClick={() => handleDeleteTransaction(tx.id)}
              /> 
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Pagination Footer */}
     <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-white/5">
  <p className="text-sm text-slate-600 font-medium order-2 sm:order-1">
    Page <span className="text-slate-400">1</span> of <span className="text-slate-400">10</span>
  </p>
  
  <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
    <button 
      className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-white/10 text-sm font-semibold text-slate-500 hover:bg-white/5 hover:text-white transition-all disabled:opacity-50" 
      disabled
    >
      Previous
    </button>
    <button 
      className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-white/10 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-all"
    >
      Next
    </button>
  </div>
</div>
    </div>

    {/* Deactivation Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-[#101828]">Deactivate Subscription</h2>
            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>
          <p className="text-[#667085] text-sm mb-8">
            Are you sure you want to deactivate this subscription? You can reactivate it at any time.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-[#344054] hover:bg-slate-50 text-sm">
              Cancel
            </button>
            <button onClick={confirmDeactivation} className="flex-1 py-3 bg-[#D92D20] text-white rounded-xl font-bold hover:bg-red-700 text-sm">
              Deactivate
            </button>
          </div>
        </div>
      </div>
    )}

    {isInvoiceOpen && selectedInvoice && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[60] p-4">
    <div className="bg-white text-[#101828] rounded-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-slate-100">
        <h3 className="font-bold text-lg">Invoice</h3>
        <button onClick={() => setIsInvoiceOpen(false)} className="text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
      </div>

      <div className="p-8">
        {/* Top Info Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Invoice</h2>
            <p className="text-slate-500 text-sm">Invoice {selectedInvoice.id}</p>
            <p className="text-slate-500 text-sm">Date: {selectedInvoice.date}</p>
          </div>
          <div className="md:text-right">
            <h3 className="font-bold text-lg mb-1">Company Name</h3>
            <p className="text-slate-500 text-xs">123 Business Street</p>
            <p className="text-slate-500 text-xs">Lagos, Nigeria 100001</p>
            <p className="text-slate-500 text-xs text-blue-600">contact@company.com</p>
          </div>
        </div>

        {/* Bill To & Subscription Details */}
   <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
  <div>
    <p className="text-[#374151] text-xs font-bold uppercase tracking-wider mb-2">
      Bill To:
    </p>
    <h4 className="font-bold text-[#101828]">John Smith</h4>
    <p className="text-slate-500 text-sm">john@example.com</p>
  </div>
  
  <div className="md:text-right">
    <p className="text-[#374151] text-ls font-bold tracking-wider mb-2">
      Subscription Details:
    </p>
    <p className="text-slate-500 text-sm">
      <span className="text-[#374151]">Plan:</span> 
      <span className="text-[#374151] font-medium ml-1">Premium Package</span>
    </p>
    <p className="text-slate-500 text-sm">
      <span className="text-[#374151]">Billing Cycle:</span> 
      <span className="text-[#374151] font-medium ml-1">Monthly</span>
    </p>
    <p className="text-slate-500 text-sm">
      <span className="text-[#374151]">Next Billing Date:</span> 
      <span className="text-[#374151] font-medium ml-1">April 15, 2026</span>
    </p>
  </div>
</div>
       <div className="bg-[#F9FAFB] border border-slate-100 rounded-xl overflow-hidden">
  <div className="md:hidden p-4 space-y-4">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Description</p>
        <p className="text-sm font-medium text-slate-900">Premium Subscription Plan</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Qty</p>
        <p className="text-sm font-medium">1</p>
      </div>
    </div>
    
    <div className="flex justify-between border-t border-slate-100 pt-3">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Unit Price</p>
        <p className="text-sm">{selectedInvoice.amount}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Total</p>
        <p className="text-sm font-semibold">{selectedInvoice.amount}</p>
      </div>
    </div>

    {/* Mobile Summary */}
    <div className="bg-slate-50 -mx-4 p-4 space-y-2 border-t border-slate-200">
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Subtotal</span>
        <span>{selectedInvoice.amount}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Tax (10%)</span>
        <span>N3,000</span>
      </div>
      <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
        <span>Total</span>
        <span>N33,000</span>
      </div>
    </div>
  </div>

  {/* --- DESKTOP VIEW (Table) --- */}
  <table className="hidden md:table w-full text-sm text-left">
    <thead className="text-slate-500 font-medium border-b border-slate-200">
      <tr>
        <th className="p-4 text-[#374151]">Description</th>
        <th className="p-4 text-[#374151] text-center w-24">Quantity</th>
        <th className="p-4 text-[#374151] text-right">Unit Price</th>
        <th className="p-4 text-[#374151] text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-100">
        <td className="p-4 font-medium">Premium Subscription Plan</td>
        <td className="p-4 text-center text-slate-600">1</td>
        <td className="p-4 text-right">{selectedInvoice.amount}</td>
        <td className="p-4 text-right font-medium">{selectedInvoice.amount}</td>
      </tr>
      {/* Summary Rows */}
      <tr>
        <td colSpan={2} />
        <td className="p-4 text-right font-bold text-slate-900">Subtotal</td>
        <td className="p-4 text-right font-medium">{selectedInvoice.amount}</td>
      </tr>
      <tr>
        <td colSpan={2} />
        <td className="p-4 text-right font-bold text-slate-900">Tax (10%)</td>
        <td className="p-4 text-right font-medium">N3,000</td>
      </tr>
      <tr className="border-t border-slate-200 bg-white">
        <td colSpan={2} />
        <td className="p-4 text-right font-bold text-lg">Total</td>
        <td className="p-4 text-right font-bold text-lg text-[#101828]">N33,000</td>
      </tr>
    </tbody>
  </table>
</div>
      </div>

      {/* Footer */}
      <div className="p-8 text-center bg-slate-50/50">
        <p className="text-slate-500 text-sm mb-1">Thank you for your business!</p>
        <p className="text-slate-400 text-xs">For any questions, please contact support@subscribely.com</p>
      </div>
    </div>
  </div>
)}
  </div>
);   
 }