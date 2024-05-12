import React, { useState, useEffect } from "react";
import axios from "axios";
import numeral from "numeral";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";

import { colors } from "@mui/material";
Chart.register(...registerables);

const CryptoByVolumePieChart = () => {
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
    // sort it by total_volume in descending order,
    // take top 3 results using slice
    // and then map
    labels: chartData
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 3)
      .map((coin) => coin.name),
    datasets: [
      {
        data: chartData
          .sort((a, b) => b.total_volume - a.total_volume)
          .slice(0, 3)
          .map((coin) => coin.total_volume),
        backgroundColor: ["#f44336", "#2196f3", "#ffc107"],

        borderWidth: 1,
        borderColor: colors.common.white,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
    },
    plugins: {
      legend: {
        color: "#ffffff",
        display: true,
        padding: 30,
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
      },
      datalabels: {
        display: true,
        color: "#ffffff",
        align: "center",
        labels: {
          title: {
            font: {
              weight: "bold",
              size: 13,
            },
          },
        },
        formatter: (value) => numeral(value).format("$0,0.00"),
      },
    },
  };

  return (
    <Card style={{ backgroundColor: "#233044", color: "#fff" }}>
      <CardHeader
        title="Top 3 Cryptocurrencies By Volume"
        subheader="Top 3 Cryptocurrencies Measured By Their Total Volume"
      />
      <Divider />
      <CardContent>
        <Box sx={{ height: 400, position: "relative" }}>
          <Pie data={data} options={options} plugins={[ChartDataLabels]} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CryptoByVolumePieChart;
