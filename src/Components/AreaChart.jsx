import React, { useState, useEffect } from "react";
import axios from "axios";
import numeral from "numeral";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { alpha } from "@mui/material/styles";
import { colors } from "@mui/material";

Chart.register(...registerables);

const AreaChart = () => {
  const [chartData, setChartData] = useState([]);

  const fetchTopCoins = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false",
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setChartData(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTopCoins();
  }, []);

  const data = {
    // copy data from the state to a new array,
    // sort it by ath in descending order,
    // take top 10 results using slice
    // and then map
    labels: chartData
      .sort((a, b) => b.ath - a.ath)
      .slice(0, 10)
      .map((coin) => coin.name),
    datasets: [
      {
        label: "All-Time-High",
        fontColor: colors.common.white,
        data: chartData
          .sort((a, b) => b.ath - a.ath)
          .slice(0, 10)
          .map((coin) => coin.ath),
        fill: true,
        backgroundColor: "#32a6fb",
        borderColor: "#ffffff",
        tension: 0.3,
        pointRadius: 3,
        // pointBackgroundColor: theme.palette.primary.main,
        // pointBorderColor: alpha(theme.palette.primary.main, 0.8),
        pointHoverRadius: 3,
        // pointHoverBackgroundColor: theme.palette.primary.main,
        pointHitRadius: 50,
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        align: "top",
        labels: {
          title: {
            font: {
              weight: "bold",
              size: 13,
            },
            padding: 10,
          },
        },
        formatter: (value) => numeral(value).format("$0,0.00"),
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ff9800",
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: "#f6ff9c",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
          padding: 10,
          callback: (value) => numeral(value).format("$0,0.00"),
        },
        display: true,
        borderDash: [5, 5],
        grid: {
          color: "#ef9dd6",
        },
      },
    },
  };

  return (
    <Card style={{ backgroundColor: "#131315", color: "#fff" }}>
      <CardHeader
        title="Top 10 Cryptocurrencies By All-Time-High"
        subheader="Top 10 Cryptocurrencies Measured By Their All-Time-High (ATH)"
      />
      <Divider />
      <CardContent>
        <Box sx={{ height: 400, position: "relative" }}>
          <Line data={data} options={options} plugins={[ChartDataLabels]} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AreaChart;
