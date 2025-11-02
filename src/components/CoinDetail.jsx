import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Chart as ChartJS } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const CoinDetail = ({ coin }) => {
  const [chartData, setChartData] = useState(null);
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!coin) return;

    const fetchChart = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`;
      const res = await fetch(url);
      const data = await res.json();

      const prices = data.prices.map(p => p[1]);
      const dates = data.prices.map(p => new Date(p[0]).toLocaleDateString());

      setChartData({
        labels: dates,
        datasets: [{
          label: `${coin.name} Price (USD)`,
          data: prices,
          borderColor: "#00ffcc",
          borderWidth: 2,
          fill: false,
          tension: 0.2
        }]
      });
    };

    fetchChart();
  }, [coin]);

  const handleCalc = () => {
    if (!amount || isNaN(amount)) return;
    setResult(amount * coin.current_price);
  };

  if (!coin) return null;

  return (
    <div id="details">
      <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
      {chartData && <Line data={chartData} options={{ plugins: { legend: { labels: { color: "#fff" } } } }} />}
      
      <div className="calc">
        <h3>Kalkulator Nilai</h3>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Masukkan jumlah coin" />
        <button onClick={handleCalc}>Hitung</button>
        {result && <p>{amount} {coin.name} = ${result.toLocaleString()}</p>}
      </div>
    </div>
  );
};

export default CoinDetail;
