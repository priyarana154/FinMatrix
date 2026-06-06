// 📂 Frontend/src/components/Investment.jsx
import React, { useState, useEffect } from "react";

const Investment = () => {
  const [investments, setInvestments] = useState([]);
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState("Mutual Funds");
  const [investedAmount, setInvestedAmount] = useState("");
  const [quantity, setQuantity] = useState(""); 
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

  const fetchInvestments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/investments/all`,
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
        setInvestments(data);
      }
    } catch (error) {
      console.error("Error fetching investments:", error);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assetName || !investedAmount || !quantity) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

     let multiplier = 1.15; 
    if (assetType === "Stocks") multiplier = 1.28; 
    if (assetType === "Crypto") multiplier = 0.85; 

    const simulatedCurrentValue = Number(investedAmount) * multiplier;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/investments/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assetName,
            assetType,
            investedAmount,
            currentValue: simulatedCurrentValue,
          }),
        },
      );

      const newData = await response.json();
      if (response.ok) {
        setInvestments([newData, ...investments]);
        setAssetName("");
        setInvestedAmount("");
        setQuantity("");
      } else {
        alert(newData.message || "Failed to log investment");
      }
    } catch (error) {
      console.error("Error logging investment:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalInvested = investments.reduce(
    (sum, item) => sum + Number(item.investedAmount),
    0,
  );
  const totalCurrent = investments.reduce(
    (sum, item) => sum + Number(item.currentValue),
    0,
  );
  const absoluteReturns = totalCurrent - totalInvested;
  const returnPercentage =
    totalInvested > 0 ? (absoluteReturns / totalInvested) * 100 : 0;

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
        Investment Ledger Engine
      </h2>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        Automated capital deployment tracker incorporating asset classification
        vectors.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
            borderLeft: "4px solid #64748b",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            Total Invested Capital
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              marginTop: "4px",
              color: "#0f172a",
            }}
          >
            ₹{totalInvested.toLocaleString("en-IN")}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
            borderLeft: "4px solid #3b82f6",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            Current Asset Valuation
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              marginTop: "4px",
              color: "#0f172a",
            }}
          >
            ₹{totalCurrent.toLocaleString("en-IN")}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
            borderLeft:
              absoluteReturns >= 0 ? "4px solid #10b981" : "4px solid #ef4444",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            Calculated Portfolio Yield
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              marginTop: "4px",
              color: absoluteReturns >= 0 ? "#10b981" : "#ef4444",
            }}
          >
            {absoluteReturns >= 0 ? "+" : ""}₹
            {absoluteReturns.toLocaleString("en-IN")} (
            {returnPercentage.toFixed(2)}%)
          </div>
        </div>
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
            Deploy Capital
          </h3>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Asset Name
              </label>
              <input
                type="text"
                placeholder="e.g., Tata Motors, Nifty Index Fund"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Asset Classification
              </label>
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <option value="Mutual Funds">Mutual Funds</option>
                <option value="Stocks">Stocks (Equity)</option>
                <option value="Gold">Gold Asset</option>
                <option value="Crypto">Digital Assets (Crypto)</option>
              </select>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Units / Quantity
              </label>
              <input
                type="number"
                placeholder="e.g., 10"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Total Purchase Cost (₹)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={investedAmount}
                onChange={(e) => setInvestedAmount(e.target.value)}
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
              {loading ? "Processing..." : "+ Commit Capital"}
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
            Asset Holdings Matrix
          </h3>

          {investments.length === 0 ? (
            <p
              style={{
                color: "#94a3b8",
                textAlign: "center",
                marginTop: "40px",
              }}
            >
              No assets allocated yet. Seed your initial deployment vectors.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isSmallCard
                  ? "1fr"
                  : "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "16px",
              }}
            >
              {investments.map((item) => {
                const itemProfit = item.currentValue - item.investedAmount;
                const itemPercent = (itemProfit / item.investedAmount) * 100;
                const avgPrice = item.investedAmount / (quantity || 1); 

                return (
                  <div
                    key={item._id}
                    style={{
                      padding: "18px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "12px",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "600",
                            fontSize: "15px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {item.assetName}
                        </span>
                        <span
                          style={{
                            fontSize: "10px",
                            backgroundColor: "rgba(255,255,255,0.12)",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            flexShrink: 0,
                          }}
                        >
                          {item.assetType}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "10px", color: "#94a3b8" }}>
                            BUY PRICE (TOTAL)
                          </div>
                          <div style={{ fontSize: "14px", fontWeight: "600" }}>
                            ₹{item.investedAmount.toLocaleString("en-IN")}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "10px", color: "#94a3b8" }}>
                            CURRENT VALUE
                          </div>
                          <div style={{ fontSize: "14px", fontWeight: "600" }}>
                            ₹
                            {Math.round(item.currentValue).toLocaleString(
                              "en-IN",
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        paddingTop: "8px",
                        marginTop: "4px",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        color: itemProfit >= 0 ? "#10b981" : "#ef4444",
                        fontWeight: "600",
                      }}
                    >
                      <span>Simulated Yield:</span>
                      <span>
                        {itemProfit >= 0 ? "+" : ""}₹
                        {Math.round(itemProfit).toLocaleString("en-IN")} (
                        {itemPercent.toFixed(1)}%)
                      </span>
                    </div>
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

export default Investment;
