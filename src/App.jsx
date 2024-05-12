import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./style/main.css";
import Header from "./Components/Header";
import Landing from "./Components/Landing";
import SliderBet from "./Components/SliderBet";
import CoinsList from "./Components/CoinsList";
import { Route, Router, Routes } from "react-router-dom";
import CoinDetails from "./Components/CoinDetails";
import BarChatrSec from "./Components/BarChatrSec";
import CircleChartSec from "./Components/CircleChartSec";
import { PolarArea } from "react-chartjs-2";
import PolarAreaChart from "./Components/PolarAreaChart";
import LineChart from "./Components/LineChart";
import DoughnutChart from "./Components/DoughnutChart";
import AreaChart from "./Components/AreaChart";
import Footer from "./Components/Footer";
import HistoryChart from "./Components/HistoryChart";
import FormToLogin from "./Components/FormToLogin";
import FormToSignUp from "./Components/FormToSignUp";
import AllCoinsList from "./Components/AllCoinsList";

// import "../node_modules/bootstrap/dist/css/m"

function App() {
  window.localStorage.setItem("currency", "USD");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <main>
                <article>
                  <Landing />
                  <SliderBet />
                  <CoinsList />
                  <BarChatrSec />
                  <div className="charts-x01">
                    <CircleChartSec />
                    <PolarAreaChart />
                  </div>
                  <div className="charts-x02">
                    <DoughnutChart />
                    <LineChart />
                  </div>
                  <AreaChart />
                </article>
              </main>
            </>
          }
        />
        <Route
          path="/:coinID"
          element={
            <>
              <CoinDetails />
              <HistoryChart />
            </>
          }
        />
        <Route path="loginorsignup" element={<FormToLogin />} />
        <Route path="signup" element={<FormToSignUp />} />
        <Route path="coinList" element={<AllCoinsList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
