import React from "react";
import {
  CreditCard,
  TrendingUp,
  PieChart,
  Target,
  Cpu,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6 text-cyan-600" />,
      title: "Analytics Dashboard",
      description:
        "Explore income and expense trends with day, month, and year-wise views. Analyze category-wise spending patterns through interactive charts and visual reports.",
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-emerald-600" />,
      title: "Expense Tracking",
      description:
        "Monitor monthly outflows, categorize bills, and track where every rupee goes in real time.",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      icon: <PieChart className="w-6 h-6 text-indigo-600" />,
      title: "Bank Account Aggregation",
      description:
        "Connect multiple accounts to get a unified view of your active liquidity and cash flow.",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    
    {
      icon: <Target className="w-6 h-6 text-amber-600" />,
      title: "Financial Goal Target",
      description:
        "Set and achieve dynamic milestone allocations. Track your progression seamlessly.",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      title: "AI Insights",
      description:
        "Get personalized, deep-dive recommendations tailored explicitly to your unique transactional data pattern.",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans py-12">
      <section className="max-w-7xl mx-auto px-8 pt-12 pb-8">
        <div className="border-l-4 border-violet-600 pl-4 mb-6">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">
            FinMatrix overview
          </h1>
          <p className="text-slate-500 max-w-2xl text-base">
            FinMatrix realtime money parameters and assets distributions,
            engineered to bring absolute clarity to your wealth management
            journey.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {coreFeatures.map((feature, index) => (
            <div
              key={index}
              className={`
          bg-white rounded-xl p-6 border border-slate-100
          hover:border-slate-200
          shadow-[0_2px_8px_rgba(0,0,0,0.04)]
          hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]
          transition-all duration-300 flex flex-col justify-between
          ${
            index === 4
              ? "md:col-span-2 xl:col-span-1 md:max-w-md md:mx-auto"
              : ""
          }
        `}
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center mb-5 border border-slate-100">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${feature.badgeColor}`}
                >
                  Active Module
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-16">
        <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Ready to analyze your cash flow analytics trends?
            </h3>
            <p className="text-sm text-slate-500">
              Hop back onto your dashboard to check live visual mappings across
              months.
            </p>
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-6 py-3 rounded-lg shadow-sm transition-all whitespace-nowrap">
            Go to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};

export default Features;
