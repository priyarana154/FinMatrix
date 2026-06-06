import React from "react";
import {
  Rocket,
  Play,
  Wallet,
  TrendingUp,
  ShieldCheck,
  Compass,
  Brain,
  Zap,
  Smartphone,
} from "lucide-react";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] pt-[116px] pb-16 px-6 overflow-hidden flex flex-col items-center relative font-['Inter']">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/40 to-blue-50/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-50/50 to-indigo-100/30 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-[1240px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="col-span-1 lg:col-span-5 flex flex-col text-left gap-6 z-10">
          <div className="inline-flex items-center gap-2 bg-[#f5f3ff] border border-indigo-100/80 px-4 py-1.5 rounded-full w-fit shadow-sm shadow-indigo-50 animate-fade-in">
            <SparklesIcon className="text-[#6366f1] h-4 w-4" />
            <span className="text-[12px] font-semibold text-[#6366f1] uppercase tracking-wider">
              AI-Powered Personal Finance Manager
            </span>
          </div>

          <h1 className="text-[44px] sm:text-[54px] font-[800] text-[#0f172a] leading-[1.1] tracking-tight">
            Take Control of <br />
            <span className="bg-gradient-to-r bg-gradient-to-r from-[#4f46e5] via-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
              Your Financial Future
            </span>
          </h1>

          <p className="text-[#64748b] text-[16px] sm:text-[17px] font-normal leading-relaxed max-w-[460px]">
            Track expenses, manage investments, analyze spending patterns and
            grow your wealth smarter with AI insights.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button className="flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-7 py-3.5 rounded-xl font-semibold text-[15px] shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all hover:-translate-y-0.5">
              <Rocket size={18} /> Go to Dashboard
            </button>
            
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center gap-3 shadow-[0_4px_20px_rgba(241,245,249,0.6)]">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <Wallet size={18} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">
                  Track Expenses
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">Easily</p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center gap-3 shadow-[0_4px_20px_rgba(241,245,249,0.6)]">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <TrendingUp size={18} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">
                  Smart Analytics
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  AI Insights
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center gap-3 shadow-[0_4px_20px_rgba(241,245,249,0.6)]">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">
                  Secure & Private
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  Your Data
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center gap-3 shadow-[0_4px_20px_rgba(241,245,249,0.6)]">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Compass size={18} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">
                  Plan Your Future
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">Better</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-7 flex justify-center lg:justify-end animate-fade-in-up">
          <div className="w-full max-w-[660px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(148,163,184,0.12)] rounded-2xl overflow-hidden p-4 sm:p-6 transition-all hover:shadow-[0_24px_60px_rgba(148,163,184,0.18)]">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <img src="/F.png" alt="mini logo" className="h-[22px] w-auto" />
                <span className="text-[14px] font-extrabold text-slate-800 tracking-tight">
                  FinMatrix
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-md text-[11px] font-medium">
                May 24 - Jun 30, 2026
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-800 flex items-center gap-1.5">
                    Hello,There 👋
                  </h2>
                  <p className="text-[12px] text-slate-400 font-medium">
                    Here's your financial overview
                  </p>
                </div>
                <button className="bg-indigo-600 text-white font-semibold text-[11px] px-3 py-1.5 rounded-lg shadow-sm shadow-indigo-100">
                  + Add Expense
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-xl">
                  <p className="text-[11px] font-medium text-slate-400 mb-1">
                    Total Balance
                  </p>
                  <p className="text-[15px] font-bold text-slate-800">
                    ₹1,25,430
                  </p>
                  <span className="text-[9px] font-bold text-emerald-600">
                    ↑ 8.4% vs last month
                  </span>
                </div>
                <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-xl">
                  <p className="text-[11px] font-medium text-slate-400 mb-1">
                    Monthly Expenses
                  </p>
                  <p className="text-[15px] font-bold text-slate-800">
                    ₹32,450
                  </p>
                  <span className="text-[9px] font-bold text-emerald-600">
                    ↓ 5.2% vs last month
                  </span>
                </div>
                <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-xl">
                  <p className="text-[11px] font-medium text-slate-400 mb-1">
                    Investments Value
                  </p>
                  <p className="text-[15px] font-bold text-slate-800">
                    ₹89,780
                  </p>
                  <span className="text-[9px] font-bold text-indigo-600">
                    ↑ 12.1% vs last month
                  </span>
                </div>
                <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-xl">
                  <p className="text-[11px] font-medium text-slate-400 mb-1">
                    Savings Goal
                  </p>
                  <p className="text-[15px] font-bold text-slate-800">75%</p>
                  <span className="text-[9px] font-bold text-amber-500">
                    On Track 🎯
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-2">
                <div className="sm:col-span-7 bg-slate-50/40 border border-slate-100 rounded-xl p-4 flex flex-col justify-between h-[160px]">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                    <span>Expense Trend</span>
                    <span className="text-slate-400 text-[9px] bg-white border px-1.5 py-0.5 rounded">
                      This Month
                    </span>
                  </div>
                  <svg
                    className="w-full h-[80px] overflow-visible mt-2"
                    viewBox="0 0 100 30"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,25 Q15,18 30,22 T60,10 T90,5 T100,2"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,25 Q15,18 30,22 T60,10 T90,5 T100,2 L100,30 L0,30 Z"
                      fill="url(#grad)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient
                        id="grad"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#ffffff" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex justify-between text-[9px] font-semibold text-slate-400 px-1">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>

                <div className="sm:col-span-5 bg-slate-50/40 border border-slate-100 rounded-xl p-4 flex flex-col justify-between h-[160px]">
                  <p className="text-[11px] font-bold text-slate-700">
                    Top Spending Categories
                  </p>
                  <div className="flex items-center justify-center gap-3 my-1">
                    <div className="w-[74px] h-[74px] rounded-full border-[10px] border-indigo-500 border-t-emerald-400 border-r-amber-400 flex items-center justify-center"></div>
                    <div className="flex flex-col gap-1 text-[9px] font-medium text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>{" "}
                        Food 35%
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>{" "}
                        Shopping 22%
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>{" "}
                        Transport 18%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

const SparklesIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L15 15l-5.187.813zM19.071 4.929l-.714 2.286-.714-2.286-2.286-.714 2.286-.714.714-2.286.714 2.286 2.286.714-2.286.714z"
    />
  </svg>
);

export default Home;
