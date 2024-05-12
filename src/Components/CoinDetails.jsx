import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoryChart from "./HistoryChart";

function CoinDetails() {
  const [coindata, setCoindata] = useState(true);
  const [coindatamoney, setcoindatamoney] = useState(true);
  const [loader, setloader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  let currency = window.localStorage.getItem("currency");
  let { coinID } = useParams();
  useEffect(() => {
    let period = "24h";
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinID}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`
      )
      .then((res) => res.data)
      .then((data) => {
        setCoindata(data);
        setloader(true);
      });

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=${period}`
      )
      .then((res) => res.data)
      .then((data) => {
        setcoindatamoney(
          data.filter((e) => {
            return e.id === coinID;
          })
        );
        setLoader2(true);
      });
  }, []);
  console.log(coindata);
  console.log(coindatamoney);
  return (
    <div className="coinDetails">
      {(() => {
        if (loader) {
          return (
            <div className="container-coin">
              <div className="details-coin">
                <div className="xidf">
                  <img src={coindata.image.large} alt="" />
                </div>
                <div className="coin-name">{coindata.id}</div>
                <div className="coin-detais">
                  <p
                    className="mt-6 text-gray-500 [&>span]:text-blue-600 [&>span]:underline"
                    // dangerouslySetInnerHTML={{
                    //   __html: coindata.description.en,
                    // }}
                  >
                    {coindata.description.en.substr(
                      0,
                      coindata.description.en.indexOf(".")
                    )}
                  </p>
                </div>
                <div className="coin-rank">
                  Rank : {coindata.market_cap_rank}
                </div>
                {(() => {
                  if (loader2) {
                    return (
                      <>
                        <div className="coin-CurrentPrice">
                          Current Price: $ {coindatamoney[0].current_price}
                        </div>
                        <div className="coin-MarketCap">
                          Market Cap: $ {coindatamoney[0].market_cap}
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div className="coin-CurrentPrice">
                          Current Price: $ 00,000
                        </div>
                        <div className="coin-MarketCap">
                          Market Cap: $ 0,000,000 M
                        </div>
                      </>
                    );
                  }
                })()}
              </div>
            </div>
          );
        } else {
          return <div>loading</div>;
        }
      })()}
    </div>
  );
}

export default CoinDetails;
