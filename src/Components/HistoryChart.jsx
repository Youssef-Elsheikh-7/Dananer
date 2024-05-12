import { useParams } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HistoryChart = () => {
  const { coinID } = useParams();

  const [historyCoin, setHistoryCoin] = useState([]);
  const [loader, setloader] = useState(false);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=USD&days=${period}`
      )
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setHistoryCoin(data);
        setloader(true);
      });
  }, [period]);

  if (!loader) {
    return <div className="wrapper-container mt-8"></div>;
  } else {
    const coinChartData = historyCoin.prices.map((value) => ({
      x: value[0],
      y: value[1].toFixed(2),
    }));

    const options = {
      responsive: true,
    };
    const data = {
      labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
      datasets: [
        {
          fill: true,
          label: coinID,
          data: coinChartData.map((val) => val.y),
          borderColor: "#17c4e6",
          backgroundColor: "rgba(53, 162, 235, 0.1)",
          color: "#ffffff",
        },
      ],
    };

    return (
      <div className="historyChart-z03">
        <Line options={options} data={data} />
        <div className="customButtons">
          <button onClick={() => setPeriod(1)}>1 Day</button>
          <button onClick={() => setPeriod(7)}>7 Days</button>
          <button onClick={() => setPeriod(30)}>1 Month</button>
          <button onClick={() => setPeriod(90)}>3 Months</button>
          <button onClick={() => setPeriod(365)}>1 Year</button>
        </div>
      </div>
    );
  }
};

export default HistoryChart;

// <Skeleton className="h-72 w-full mb-10" />
