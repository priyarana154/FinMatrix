import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // 👈 Outlet aur Routing hooks import karein
import {
  LayoutDashboard,
  CreditCard,
  Building2,
  TrendingUp,
  PieChart,
  Briefcase,
  BarChart3,
  Wallet,
  Target,
  FileText,
  Settings,
  Menu,
  X,
  MessageCircle as chatbot,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const Dashboard = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
      color: "text-[#4f46e5] bg-indigo-50",
    },
    {
      name: "Transactions",
      path: "/dashboard/expenses",
      icon: CreditCard,
      color: "text-[#10b981] bg-emerald-50",
    },
    {
      name: "Bank Accounts",
      path: "/dashboard/banks",
      icon: Building2,
      color: "text-[#0d9488] bg-teal-50",
    },
    
    {
      name: "Goal",
      path: "/dashboard/goals",
      icon: Target,
      color: "text-[#f43f5e] bg-rose-50",
    },
    {
      name: "AI Insights",
      path: "/dashboard/ai-insights",
      icon: chatbot,
      color: "text-[#64748b] bg-slate-50",
    },
    {
      name: "Go Back",
      path: "/",
      icon: ArrowLeft,
      color: "text-[#64748b] bg-slate-50",
    },
    {
      name: "Setting",
      path: "/dashboard/settings",
      icon: Settings,
      color: "text-[#64748b] bg-slate-50",
    },
  ];

  const currentActiveItem =
    menuItems.find((item) => location.pathname === item.path) || menuItems[0];
  {
    user?.name ? user.name.charAt(0).toUpperCase() : "U";
  }
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex font-['Inter'] pt-[76px] relative">
      <div className="w-full h-12 bg-white border-b border-slate-100 flex items-center justify-between px-4 fixed top-[76px] left-0 z-40 lg:hidden">
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-1">
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <span className="text-[14px] font-bold text-slate-700">
          {currentActiveItem.name}
        </span>

        <div className="w-[22px]" />
      </div>

      <aside className="hidden lg:flex w-[260px] h-[calc(100vh-76px)] bg-white border-r border-slate-100 fixed left-0 top-[76px] flex-col justify-between p-4 z-30">
        <div className="flex flex-col gap-1 overflow-y-auto pr-1 custom-scrollbar">
          {menuItems.map((item, idx) => {
            const isActive =
              item.path === "/dashboard"
                ? location.pathname === item.path 
                : item.path === "/"
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);
            return (
              <button
                key={idx}
                onClick={() => navigate(item.path)} 
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all group ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg ${isActive ? "bg-white/10 text-white" : item.color}`}
                  >
                    <item.icon size={16} className="stroke-[2.2]" />
                  </div>
                  <span>{item.name}</span>
                </div>
                <ChevronRight
                  size={14}
                  className={`transition-opacity ${isActive ? "opacity-100 text-white" : "opacity-0 group-hover:opacity-100 text-slate-400"}`}
                />
              </button>
            );
          })}
        </div>
        <div className="border-t border-slate-100 pt-4 mt-2 flex items-center gap-3 px-2">
          <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600">
            {user?.name?.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
      </aside>

      <div
        className={`fixed top-[124px] left-0 w-[270px] h-[calc(100vh-124px)] bg-white shadow-2xl border-r border-slate-100 p-4 flex flex-col justify-between z-50 lg:hidden transition-all duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-1 overflow-y-auto">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                navigate(item.path);
                setIsMobileOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-[14px] font-semibold ${location.pathname === item.path ? "bg-slate-100 text-slate-900" : "text-slate-600"}`}
            >
              <div className={`p-2 rounded-lg ${item.color}`}>
                <item.icon size={18} />
              </div>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 min-h-[calc(100vh-76px)] lg:ml-[260px] p-6 lg:p-8 mt-12 lg:mt-0">
        <Outlet />{" "}
      </main>
    </div>
  );
};

export default Dashboard;
