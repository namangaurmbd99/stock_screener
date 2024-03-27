import React, { useState, useEffect } from 'react';

function Dashboard() {
  // State to store fetched stock data
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch stock data from the API
  const fetchStocks = async () => {
    try {
      const response = await fetch('http://localhost:3000/stocks');
      if (!response.ok) {
        throw new Error('Failed to fetch stocks');
      }
      const data = await response.json();
      setStocks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  // Fetch stock data when component mounts
  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div>
      <h1>Stock Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Latest Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>{stock.latestPrice}</td>
                <td>{stock.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
