
import React, { useState, useEffect } from "react";

const BankAccounts = () => {
  const [banks, setBanks] = useState([]);
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("Savings");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallCard, setIsSmallCard] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallCard(window.innerWidth <= 480);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchBankAccounts = async () => {
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
        setBanks(data);
      }
    } catch (error) {
      console.error("Error fetching bank data:", error);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bankName || !balance) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/banks/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bankName,
            accountType,
            balance: Number(balance),
          }),
        },
      );

      const newData = await response.json();
      if (response.ok) {
      
        await fetchBankAccounts();
        setBankName("");
        setBalance("");
      } else {
        alert(newData.message || "Failed to add account");
      }
    } catch (error) {
      console.error("Error adding bank account:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalLiquidity = banks.reduce(
    (sum, bank) => sum + Number(bank.balance || 0),
    0,
  );

  return (
    <div
      style={{
        padding: isSmallCard ? "16px" : "24px",
        color: "#1e293b",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontSize: isSmallCard ? "22px" : "28px",
          fontWeight: "bold",
          marginBottom: "4px",
        }}
      >
        Bank Accounts Framework
      </h2>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        Manage your liquid assets and structural account pools dynamically.
      </p>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          marginBottom: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          borderLeft: "6px solid #e11d48",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "#64748b",
            textTransform: "uppercase",
            fontWeight: "600",
            letterSpacing: "0.05em",
          }}
        >
          Total Aggregate Liquidity
        </span>
        <span
          style={{
            fontSize: isSmallCard ? "28px" : "36px",
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          ₹
          {totalLiquidity.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
          gap: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
            height: "fit-content",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Add New Account
          </h3>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Bank Name
              </label>
              <input
                type="text"
                placeholder="e.g., HDFC Bank, SBI"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Account Type
              </label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <option value="Savings">Savings</option>
                <option value="Salary">Salary</option>
                <option value="Current">Current</option>
                <option value="Cash">Cash (Offline)</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Initial Balance (₹)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#e11d48",
                color: "#fff",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {loading ? "Adding Pool..." : "+ Establish Account"}
            </button>
          </form>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Active Liquidity Pools
          </h3>

          {banks.length === 0 ? (
            <p
              style={{
                color: "#94a3b8",
                textAlign: "center",
                marginTop: "40px",
              }}
            >
              No bank accounts linked yet. Use the form to seed your first
              account matrix.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isSmallCard
                  ? "1fr"
                  : "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "16px",
              }}
            >
              {banks.map((bank) => (
                <div
                  key={bank._id}
                  style={{
                    padding: "20px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    color: "#fff",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justify: "space-between",
                    minHeight: "120px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {bank.bankName}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        flexShrink: 0,
                      }}
                    >
                      {bank.accountType}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        marginBottom: "2px",
                        textTransform: "uppercase",
                      }}
                    >
                      Available Balance
                    </div>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        wordBreak: "break-all",
                      }}
                    >
                      ₹
                      {Number(bank.balance).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankAccounts;
