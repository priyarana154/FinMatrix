import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3,
  ListCollapse,
  AlertTriangle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Transactions = () => {
  const [txType, setTxType] = useState("expense");
  const [transactions, setTransactions] = useState([]);

   const [timeFilter, setTimeFilter] = useState("day");

   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

   const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food & Dining");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

   const [bankPools, setBankPools] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");

  const expenseCategories = [
    "Food & Dining",
    "Shopping",
    "Infrastructure / Cloud Servers",
    "Travel & Commute",
    "Rent & Housing",
    "Utilities (Electricity/Water)",
    "Medical & Health",
    "Education & Courses",
    "Entertainment & OTT",
    "Other",
  ];

  const incomeCategories = [
    "Salary / Stipend",
    "Freelance Gig",
    "Investments Profit",
    "Business Revenue",
    "Rental Yield",
    "Grants / Rewards",
    "Other",
  ];

   useEffect(() => {
    const fetchAvailableBanks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/banks/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setBankPools(data);
           if (data.length > 0) {
            setSelectedBank(data[0]._id);
          } else {
            setSelectedBank("cash");
          }
        }
      } catch (error) {
        console.error("Failed to load bank structures:", error);
      }
    };
    fetchAvailableBanks();
  }, []);

   useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/expenses/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          const normalizedData = data.map((item) => ({
            ...item,
            amount: item.magnitude || item.amount,
            type:
              item.category && incomeCategories.includes(item.category)
                ? "income"
                : "expense",
          }));
          setTransactions(normalizedData);
        }
      } catch (error) {
        console.error("MongoDB se data laane mein dikkat hui:", error);
      }
    };

    fetchTransactions();
  }, [txType]);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Salary / Stipend":
        return "text-emerald-700 bg-emerald-50 border-emerald-100";
      case "Freelance Gig":
        return "text-teal-700 bg-teal-50 border-teal-100";
      case "Investments Profit":
        return "text-blue-700 bg-blue-50 border-blue-100";
      case "Business Revenue":
        return "text-indigo-700 bg-indigo-50 border-indigo-100";
      case "Infrastructure / Cloud Servers":
        return "text-indigo-700 bg-indigo-50 border-indigo-100";
      case "Food & Dining":
        return "text-purple-700 bg-purple-50 border-purple-100";
      case "Shopping":
        return "text-amber-700 bg-amber-50 border-amber-100";
      case "Travel & Commute":
        return "text-cyan-700 bg-cyan-50 border-cyan-100";
      case "Rent & Housing":
        return "text-rose-700 bg-rose-50 border-rose-100";
      case "Utilities (Electricity/Water)":
        return "text-orange-700 bg-orange-50 border-orange-100";
      case "Medical & Health":
        return "text-red-700 bg-red-50 border-red-100";
      case "Other":
        return "text-slate-600 bg-slate-100 border-slate-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-100";
    }
  };

   const handleSaveTransaction = async (e) => {
    e.preventDefault();
    if (!title || !amount || !date || !selectedBank)
      return alert("Please fill all mandatory parameters!");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expenses/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            category,
            magnitude: parseFloat(amount),
            date,
            bankId: selectedBank,
          }),
        },
      );

      const savedData = await response.json();

      if (response.ok) {
        const newTx = {
          _id: savedData._id,
          title,
          type: txType,
          category,
          amount: parseFloat(amount),
          date,
          bankId: selectedBank,
        };

        setTransactions([newTx, ...transactions]);
        setTitle("");
        setAmount("");
        setDate("");
        setCategory(
          txType === "expense" ? "Food & Dining" : "Salary / Stipend",
        );
      } else {
        alert(`Failed to save: ${savedData.message}`);
      }
    } catch (error) {
      console.error("Form submit failure:", error);
      alert("Database error!");
    }
  };

   const askDeletePermission = (tx) => {
    setTransactionToDelete(tx);
    setIsDeleteModalOpen(true);
  };

   const confirmDeleteTransaction = async () => {
    if (transactionToDelete) {
      try {
        const token = localStorage.getItem("token");
        setTransactions(
          transactions.filter((t) => t._id !== transactionToDelete._id),
        );
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
    setIsDeleteModalOpen(false);
    setTransactionToDelete(null);
  };

   const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, i) => s + i.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, i) => s + i.amount, 0);
  const netSavingsPool = totalIncome - totalExpense;

   const getFilteredChartData = () => {
    const currentTypeData = transactions.filter((t) => t.type === txType);
    const grouped = {};

    currentTypeData.forEach((t) => {
      const d = new Date(t.date);
      let key = "";

      if (timeFilter === "day") {
        key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      } else if (timeFilter === "week") {
        const startOfYear = new Date(d.getFullYear(), 0, 1);
        const pastDaysOfYear = (d - startOfYear) / 86400000;
        const weekNum = Math.ceil(
          (pastDaysOfYear + startOfYear.getDay() + 1) / 7,
        );
        key = `Week ${weekNum}, ${d.getFullYear()}`;
      } else if (timeFilter === "month") {
        key = d.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      } else if (timeFilter === "year") {
        key = d.getFullYear().toString();
      }

      if (!grouped[key]) {
        grouped[key] = { label: key, amount: 0 };
      }
      grouped[key].amount += t.amount;
    });

    return Object.values(grouped).sort(
      (a, b) => new Date(a.label) - new Date(b.label),
    );
  };

  const chartData = getFilteredChartData();

  return (
    <div className="w-full max-w-[1200px] flex flex-col gap-8 animate-fade-in font-['Inter'] relative">
      <div>
        <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">
          Transaction Framework
        </h1>
        <p className="text-[13px] text-slate-400 font-medium mt-0.5">
          Dual architecture portal to stream database entries dynamically.
        </p>
      </div>

       <div className="flex gap-3 border-b border-slate-100 pb-1">
        <button
          onClick={() => {
            setTxType("expense");
            setCategory("Food & Dining");
          }}
          className={`pb-3 text-[14px] font-bold transition-all flex items-center gap-2 border-b-2 px-1 ${
            txType === "expense"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <ArrowDownLeft size={16} /> Expense Matrix
        </button>
        <button
          onClick={() => {
            setTxType("income");
            setCategory("Salary / Stipend");
          }}
          className={`pb-3 text-[14px] font-bold transition-all flex items-center gap-2 border-b-2 px-1 ${
            txType === "income"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <ArrowUpRight size={16} /> Income Flow
        </button>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
         <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <form
            onSubmit={handleSaveTransaction}
            className="flex flex-col gap-4"
          >
            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
              <ListCollapse
                size={16}
                className={
                  txType === "expense" ? "text-rose-500" : "text-emerald-500"
                }
              />
              Record{" "}
              {txType === "expense" ? "Expenditure Outflow" : "Capital Inflow"}
            </h3>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Title Descriptor
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  txType === "expense"
                    ? "e.g., AWS Cloud Instance"
                    : "e.g., Stripe Payout"
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:border-slate-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Category Classification
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[13px] font-semibold text-slate-700 focus:outline-none"
                >
                  {txType === "expense"
                    ? expenseCategories.map((c, i) => (
                        <option key={i}>{c}</option>
                      ))
                    : incomeCategories.map((c, i) => (
                        <option key={i}>{c}</option>
                      ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Magnitude (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:border-slate-400 transition-colors"
                />
              </div>
            </div>

              <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Select Account / Asset Source
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[13px] font-semibold text-slate-700 focus:outline-none"
              >
                {bankPools.map((bank) => (
                  <option key={bank._id} value={bank._id}>
                    {bank.bankName}
                  </option>
                ))}
                <option value="cash">My Cash / Wallet (Offline)</option>
              </select>
            </div> 

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Execution Timestamp
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[13px] font-medium text-slate-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className={`w-full mt-2 py-2.5 rounded-xl text-white font-semibold text-[13px] shadow-md flex items-center justify-center gap-1.5 transition-all ${
                txType === "expense"
                  ? "bg-rose-500 hover:bg-rose-600 shadow-rose-100"
                  : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100"
              }`}
            >
              <Plus size={16} /> Insert Entry
            </button>
          </form>
        </div>

         <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[340px]">
          <div className="flex flex-col sm:flex-row gap-3 justify-between sm:items-center mb-4">
            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 size={16} className="text-indigo-500" />
              Live {txType === "expense" ? "Expense" : "Income"} Vectors
            </h3>

            <div className="flex bg-slate-50 border border-slate-100 p-0.5 rounded-lg w-fit">
              {["day", "week", "month", "year"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setTimeFilter(filter)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md uppercase transition-all ${
                    timeFilter === filter
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full min-h-[220px]">
            {chartData.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 text-[12px] font-medium border border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                Log entries inside the form to visualize vector trends.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={txType === "expense" ? "#f43f5e" : "#10b981"}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={txType === "expense" ? "#f43f5e" : "#10b981"}
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderRadius: "12px",
                      border: "none",
                      color: "#fff",
                      fontSize: "11px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke={txType === "expense" ? "#f43f5e" : "#10b981"}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#chartColor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

       <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center border-b border-slate-50 pb-3 mb-4">
          <h3 className="text-[14px] font-bold text-slate-800">
            Unified Account Statements
          </h3>
          <div className="text-[12px] font-bold text-slate-500">
            Net Saving Balance Pool:{" "}
            <span
              className={
                netSavingsPool >= 0 ? "text-emerald-600" : "text-rose-600"
              }
            >
              ₹{netSavingsPool.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                <th className="pb-3 pl-2">Transaction Detail</th>
                <th className="pb-3">Flow Type</th>
                <th className="pb-3">Category Tag</th>
                <th className="pb-3">Execution Date</th>
                <th className="pb-3 text-right">Delta Weight</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[13px] font-medium text-slate-600 divide-y divide-slate-50">
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-slate-400 font-medium"
                  >
                    No records found. The database layer is unmapped or blank.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3.5 pl-2 font-bold text-slate-800">
                      {tx.title}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md tracking-wider ${tx.type === "income" ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"}`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${getCategoryColor(tx.category)}`}
                      >
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400 font-semibold">
                      {tx.date ? tx.date.substring(0, 10) : ""}
                    </td>
                    <td
                      className={`py-3.5 text-right font-bold ${tx.type === "income" ? "text-emerald-500" : "text-slate-900"}`}
                    >
                      {tx.type === "income" ? "+ " : "- "}₹
                      {tx.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 text-center">
                      <button
                        onClick={() => askDeletePermission(tx)}
                        className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

       {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-sm w-full mx-4 shadow-2xl flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="p-2.5 bg-rose-50 text-rose-500 rounded-xl border border-rose-100">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-slate-900">
                  Confirm Deletion
                </h4>
                <p className="text-[12px] text-slate-400 font-medium mt-1">
                  Are you absolutely sure you want to delete{" "}
                  <span className="text-slate-700 font-bold">
                    "{transactionToDelete?.title}"
                  </span>
                  ?
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setTransactionToDelete(null);
                }}
                className="px-4 py-2 rounded-xl text-[12px] font-bold text-slate-500 bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteTransaction}
                className="px-4 py-2 rounded-xl text-[12px] font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-100 transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
