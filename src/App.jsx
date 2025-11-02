import React, { useState, useEffect } from "react";
import "./App.css";
import FilterBar from "./components/FilterBar";
import CryptoTable from "./components/CryptoTable";
import CoinDetail from "./components/CoinDetail";

function App() {
  const [coins, setCoins] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";
    const res = await fetch(url);
    const data = await res.json();
    setCoins(data);
    setFiltered(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleFilter = () => {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    const result = coins.filter(c => c.current_price >= min && c.current_price <= max);
    setFiltered(result);
  };

  return (
    <div className="App">
      <h1>💰 Crypto Price Tracker</h1>
      <FilterBar
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        onFilter={handleFilter}
        onRefresh={fetchData}
        loading={loading}
      />
      <CryptoTable coins={filtered} onSelect={setSelectedCoin} />
      <CoinDetail coin={selectedCoin} />
      <p className="note">Data updated every 60 seconds • Source: CoinGecko</p>
    </div>
  );
}

export default App;
