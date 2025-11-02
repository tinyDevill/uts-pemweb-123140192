import React from "react";

const CryptoTable = ({ coins, onSelect }) => (
  <table id="crypto-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Coin</th>
        <th>Price (USD)</th>
        <th>Market Cap</th>
        <th>24h Change</th>
      </tr>
    </thead>
    <tbody>
      {coins.length > 0 ? (
        coins.map((coin, index) => {
          const changeClass = coin.price_change_percentage_24h >= 0 ? "positive" : "negative";
          const changeSymbol = coin.price_change_percentage_24h >= 0 ? "▲" : "▼";
          return (
            <tr key={coin.id} onClick={() => onSelect(coin)}>
              <td>{index + 1}</td>
              <td style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <img src={coin.image} alt={coin.name} width="20" height="20" />
                {coin.name} ({coin.symbol.toUpperCase()})
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>${coin.market_cap.toLocaleString()}</td>
              <td className={changeClass}>{changeSymbol} {coin.price_change_percentage_24h.toFixed(2)}%</td>
            </tr>
          );
        })
      ) : (
        <tr><td colSpan="5">No data</td></tr>
      )}
    </tbody>
  </table>
);

export default CryptoTable;
