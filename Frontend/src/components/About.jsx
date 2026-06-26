import React from 'react';
import { Code2, Cpu, ExternalLink, Globe, Layout, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans *:px-8 py-12">
      <section className="max-w-7xl mx-auto px-8 pt-12 pb-8">
        <div className="border-l-4 border-violet-600 pl-4 mb-8">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">
            About FinMatrix
          </h1>
          <p className="text-slate-500 max-w-2xl text-base">
            A modern Full-Stack Personal Finance Analytics platform designed to
            bring absolute clarity to wealth tracking and cash flow trends.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                P
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Developed & Built by Priya
                </h2>
                <p className="text-sm font-medium text-violet-600">
                  Computer Engineering Student
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href="https://github.com/priyarana154"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all"
              >
                <Code2 className="w-4 h-4" /> GitHub{" "}
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/priya-rana-bb4469378/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900 px-3 py-2 rounded-lg hover:bg-slate-800 transition-all"
              >
                <Globe className="w-4 h-4" /> LinkedIn{" "}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <hr className="my-6 border-slate-100" />

          <div className="prose prose-slate max-w-none">
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Project Vision & Philosophy
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              FinMatrix is designed to simplify personal finance management
              through data-driven insights and interactive visualizations. The
              platform enables users to track expenses, monitor income, manage
              bank accounts, and evaluate financial progress from a centralized
              dashboard. The vision behind FinMatrix is to transform raw
              financial records into meaningful information that supports
              smarter budgeting, better spending decisions, and long-term
              financial planning.{" "}
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-violet-600" /> Technical Architecture
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600 font-bold">
                MERN
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Full-Stack Core</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Powered by MongoDB Atlas for dynamic analytical document
                schemas, React.js for modular rendering, and Node/Express for
                resilient routing infrastructure.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4 text-emerald-600">
                <Layout className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">
                Responsive Interface
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Styled precisely with modern Tailwind CSS utilities to guarantee
                smooth adaptive grid rendering across high-density monitor
                dashboard matrices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-4 text-purple-600">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">
                Environment Integrity
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Maintains clean separation of secrets via robust environment
                variable structures, assuring asset safety and secure runtime
                database handshakes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;