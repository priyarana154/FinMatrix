import React, { useState, useEffect } from "react";
import axios from "axios";

const StatCard = ({ title, value, color }) => {
  const colorMap = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    rose: "text-rose-600",
  };
  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
      <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </span>
      <span className={`text-2xl font-bold mt-2 ${colorMap[color]}`}>
        ₹{(value || 0).toLocaleString("en-IN")}
      </span>
    </div>
  );
};

const CustomPieChart = ({ title, chartData }) => {
  const cleanData = chartData.filter((item) => item.value > 0);
  const totalValue = cleanData.reduce((sum, item) => sum + item.value, 0);
  let accumulatedPercent = 0;

  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 w-full flex flex-col">
      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">
        {title}
      </h4>

      {cleanData.length === 0 ? (
        <div className="m-auto py-8 text-xs text-gray-400 font-medium">
          No active transactions tracked for this category
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative w-36 h-36 flex-shrink-0">
            <svg
              viewBox="0 0 36 36"
              className="w-full h-full transform -rotate-90"
            >
              {cleanData.map((item, idx) => {
                const percent = (item.value / totalValue) * 100;
                const strokeDasharray = `${percent} ${100 - percent}`;
                const strokeDashoffset = 100 - accumulatedPercent;
                accumulatedPercent += percent;
                return (
                  <circle
                    key={idx}
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="5"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
              <span className="text-[9px] font-bold text-gray-400 uppercase">
                Total
              </span>
              <span className="text-xs font-bold text-gray-700 truncate max-w-[80px]">
                ₹{totalValue.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1 w-full max-h-40 overflow-y-auto pr-1">
            {cleanData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="font-bold text-gray-600 truncate">
                    {item.name}
                  </span>
                </div>
                <div className="text-right flex-shrink-0 pl-2">
                  <span className="font-extrabold text-gray-800 block">
                    ₹{item.value.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">
                    {((item.value / totalValue) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("month");

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/overview/summary?timeframe=${timeframe}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          },
        );
        if (response.data && response.data.success) setData(response.data);
      } catch (err) {
        console.error("Error fetching overview data:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOverviewData();
  }, [timeframe]);

  const metrics = data?.metrics || {
    totalBankBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    totalGoalsTarget: 0,
    totalGoalsAchieved: 0,
  };
  const histogramData = data?.histogramData || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Financial Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            FinMatrix true financial tracking system.
          </p>
        </div>
        <div className="flex bg-white border rounded-lg p-1 shadow-sm font-semibold text-sm self-end sm:self-auto">
          {["day", "month", "year"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-1.5 rounded-md capitalize transition-all ${timeframe === t ? "bg-emerald-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Bank Balance"
          value={metrics.totalBankBalance}
          color="emerald"
        />
        <StatCard
          title="Total Income"
          value={metrics.totalIncome}
          color="blue"
        />
        <StatCard
          title="Total Expenses"
          value={metrics.totalExpenses}
          color="rose"
        />
        <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 font-bold text-sm">
          <span className="text-xs text-gray-400 font-semibold block mb-2 uppercase tracking-wider">
            FINANCIAL GOALS
          </span>
          <p className="text-amber-600">
            Target: ₹{metrics.totalGoalsTarget.toLocaleString("en-IN")}
          </p>
          <p className="text-green-600 mt-0.5">
            Achieved: ₹{metrics.totalGoalsAchieved.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CustomPieChart
          title="Income Sources Distribution"
          chartData={data?.incomePie || []}
        />
        <CustomPieChart
          title="Expenses Category Distribution"
          chartData={data?.expensePie || []}
        />
      </div>

      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Cash Flow Analytics Trend
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">
              Income and Expenses comparison side-by-side histogram pillars (
              {timeframe} wise).
            </p>
          </div>
          <div className="flex gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-blue-600">
              <span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>{" "}
              Income
            </span>
            <span className="flex items-center gap-1.5 text-rose-600">
              <span className="w-3 h-3 bg-rose-500 rounded-full inline-block"></span>{" "}
              Expenses
            </span>
          </div>
        </div>

        <div className="w-full h-64 bg-gray-50 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden">
          {loading ? (
            <div className="m-auto text-sm text-gray-400 font-medium">
              Updating histogram bars...
            </div>
          ) : (
            <div className="w-full h-full flex items-end justify-between px-2 sm:px-4 pt-6 border-b border-l border-gray-200">
              {histogramData.map((item, idx) => {
                const values = histogramData.flatMap((d) => [
                  d.income,
                  d.expense,
                ]);
                const maxVal = Math.max(...values, 1);
                const incomeHeight = `${(item.income / maxVal) * 85}%`;
                const expenseHeight = `${(item.expense / maxVal) * 85}%`;

                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center group flex-1"
                  >
                    <div className="w-full flex justify-center gap-1 items-end h-40 mb-2">
                       <div
                        className="w-3.5 sm:w-5 bg-blue-500 hover:bg-blue-600 rounded-t transition-all duration-300 relative cursor-pointer shadow-sm"
                        style={{ height: incomeHeight }}
                      >
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none whitespace-nowrap">
                          ₹{Math.floor(item.income)}
                        </span>
                      </div>

                       <div
                        className="w-3.5 sm:w-5 bg-rose-500 hover:bg-rose-600 rounded-t transition-all duration-300 relative cursor-pointer shadow-sm"
                        style={{ height: expenseHeight }}
                      >
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none whitespace-nowrap">
                          ₹{Math.floor(item.expense)}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-500 font-bold">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
