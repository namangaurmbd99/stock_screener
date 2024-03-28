import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Dashboard.css';

function Dashboard() {
  const [stockData, setStockData] = useState([]);
  const [layoutMode, setLayoutMode] = useState('chart');
  const chartRef = useRef(null);

  const stockSymbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'FB', 'NVDA', 'PYPL', 'ADBE', 'INTC', 'CSCO', 'NFLX', 'PEP', 'T', 'VZ', 'DIS', 'KO', 'WMT', 'MCD', 'XOM'];

  useEffect(() => {
    const fetchStockData = async () => {
      const data = [];
      for (const symbol of stockSymbols) {
        try {
          const response = await fetch(
            `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_83a08746342c43de9f60fdcbb800b934`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch data for ${symbol}`);
          }
          const stock = await response.json();
          data.push({
            symbol: stock.symbol,
            companyName: stock.companyName,
            latestPrice: stock.latestPrice,
            marketCap: stock.marketCap,
            volume: stock.volume, // Include volume field
            latestUpdate: stock.latestUpdate,
          });
        } catch (error) {
          console.error(error.message);
        }
      }
      setStockData(data);
    };

    fetchStockData();

    // Cleanup function to destroy the Chart instance when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    if (stockData.length > 0) {
      if (layoutMode === 'chart') {
        renderChart();
      }
    }
  }, [stockData, layoutMode]);

  const renderChart = () => {
    const labels = stockData.map((stock) => stock.symbol);
    const prices = stockData.map((stock) => stock.latestPrice);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('stock-chart');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Stock Prices',
            data: prices,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: 'Stock Prices',
            },
            ticks: {
              callback: function(value, index, values) {
                return '$' + value; // Format the y-axis tick labels
              }
            }
          }
        }
      },
    });
  };

  const toggleLayoutMode = () => {
    setLayoutMode(layoutMode === 'chart' ? 'table' : 'chart');
  };

  return (
    <div className="container">
      <div className="chart-container">
        <canvas id="stock-chart" className="chart" style={{ display: layoutMode === 'chart' ? 'block' : 'none' }}></canvas>
        {layoutMode === 'table' && (
          <table className="table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company Name</th>
                <th>Latest Price</th>
                <th>Market Cap</th>
                <th>Volume</th>
                <th>Latest Update</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {stockData.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.symbol}</td>
                  <td>{stock.companyName}</td>
                  <td>{stock.latestPrice}</td>
                  <td>{stock.marketCap}</td>
                  <td>{stock.volume}</td>
                  <td>{new Date(stock.latestUpdate).toLocaleString()}</td>
                  {/* Add more table cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button onClick={toggleLayoutMode}>Toggle Layout</button>
    </div>
  );
}

export default Dashboard;
