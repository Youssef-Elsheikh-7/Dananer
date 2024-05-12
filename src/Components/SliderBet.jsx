import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// Import Swiper styles
import "swiper/css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

function SliderBet() {
  const [data, setData] = useState([]);
  const [loader, setloader] = useState(false);
  let currency = window.localStorage.getItem("currency");
  useEffect(() => {
    let period = "24h";
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=${period}`
      )
      .then((res) => res.data)
      .then((data) => {
        setloader(true);
        setData(data);
      });
  }, []);
  console.log(data);
  return (
    <section className="section trend" aria-label="crypto trend" data-section>
      <div className="container">
        <div className="trend-tab">
          <ul className="tab-nav">
            <li>
              <button className="tab-btn active">Crypto</button>
            </li>

            <li>
              <button className="tab-btn">international currencies</button>
            </li>
          </ul>
          {(() => {
            if (loader) {
              return (
                <Swiper
                  loop={true}
                  autoplay={{
                    delay: 100,
                    disableOnInteraction: true,
                  }}
                >
                  {data.map((e, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <li>
                          <div className="trend-card">
                            <div className="card-title-wrapper">
                              <img
                                src={e.image}
                                width="24"
                                height="24"
                                alt="bitcoin logo"
                              />

                              <a href="#" className="card-title">
                                {e.id}{" "}
                                <span className="span">
                                  {e.symbol}/{currency}
                                </span>
                              </a>
                            </div>

                            <data className="card-value" value="46168.95">
                              {currency === "USD" ? "$" : "€"}{" "}
                              {e.current_price.toFixed(3)}
                            </data>

                            <div className="card-analytics">
                              <data className="current-price" value="36641.20">
                                {e.ath}
                              </data>

                              <div className="badge red">
                                {e.ath_change_percentage.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </li>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              );
            } else {
              return <Loader />;
            }
          })()}
          <ul className="tab-content"></ul>
        </div>
      </div>
    </section>
  );
}

export default SliderBet;
