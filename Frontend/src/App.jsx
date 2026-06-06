import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Login from "./components/Login";
import BankAccounts from "./components/BankAccounts";
import Investment from "./components/Investment";
import Setting from "./components/Setting";
import Features from "./components/Features";
import About from "./components/About";
import Goal from "./components/Goal";
import AIGeneratedInsights from "./components/AIChatbot";
import Contact from "./components/Contact";
import Overview from "./components/Overview";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />

          <Route path="expenses" element={<Transactions />} />
          <Route path="banks" element={<BankAccounts />} />
          <Route path="investments" element={<Investment />} />
          <Route path="goals" element={<Goal />} />
          <Route path="ai-insights" element={<AIGeneratedInsights />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
