import React, { useState, useEffect } from "react";

const Goal = () => {

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestAiInsight, setLatestAiInsight] = useState(
    "Apna naya financial goal set kijiye, FinMatrix AI yahan aapko real-time advice dega!",
  );

  useEffect(() => {
    fetchGoals();
  }, []);


  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token"); 
       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/goals/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (resData.success) {
        setGoals(resData.data || []);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLatestAiInsight(
      "FinMatrix AI aapke pichle expenses aur goal ko analyze kar raha hai... Please wait 🤖✨",
    );

    try {
      const token = localStorage.getItem("token");
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/goals/create`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    goalName,
    targetAmount: Number(targetAmount),
    targetDate,
  }),
});

      const newData = await response.json();

      if (response.ok && newData.success) {
        setGoals([newData.data, ...goals]);
        setLatestAiInsight(newData.data.aiInsight);

        setGoalName("");
        setTargetAmount("");
        setTargetDate("");
      } else {
        alert(newData.message || "Goal add karne mein kuch dikkat aayi.");
        setLatestAiInsight(
          "Analysis failed. Kripya details sahi se check karein.",
        );
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      alert("Server integration error.");
    } finally {
      setLoading(false);
    }
  };const handleAddMoney = async (goalId) => {
    const amount = prompt("Kitni saving add karni hai?");

    if (!amount) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/goals/update/${goalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amountToAdd: Number(amount),
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        fetchGoals(); 
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          🎯 Financial Goals Manager
        </h1>
        <p className="text-slate-500 text-sm">
          Track your dreams and plan for better savings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">
              set a new financial goal
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Macbook Pro, Emergency Fund"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Target Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g., 60000"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full md:w-1/2 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg text-sm shadow-sm hover:bg-indigo-700 transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "AI Processing..." : "Save Goal & Get AI Insight"}
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">
              Your Active Goals
            </h2>
            {goals.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-6">
                You don't have any active goals yet. Create a new goal to get started!
              </p>
            ) : (
              <div className="space-y-4">
                {goals.map((goal) => {
                  const currentProgress = Math.min(
                    Math.round(
                      ((goal.currentAmount || 0) / goal.targetAmount) * 100,
                    ),
                    100,
                  );

                  return (
                    <div
                      key={goal._id}
                      className="p-4 mb-4 bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 capitalize">
                            {goal.goalName}
                          </h3>

                          <p className="text-gray-400 text-xs mt-0.5">
                            Target Date:{" "}
                            {new Date(goal.targetDate).toLocaleDateString(
                              "en-IN",
                            )}
                          </p>
                        </div>

                        <span className="font-bold text-xl text-indigo-600">
                          ₹{goal.targetAmount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${currentProgress}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>
                          Saved: ₹
                          {(goal.currentAmount || 0).toLocaleString("en-IN")}
                        </span>

                        <span className="text-indigo-600 font-semibold">
                          {currentProgress}% Achieved
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddMoney(goal._id)}
                        className="mt-3 px-3 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Add Savings
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Goal;
