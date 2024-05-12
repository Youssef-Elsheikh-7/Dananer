import axios from "axios";
import { useEffect, useState } from "react";
import "../style/main.css";
import red from "../images/chart-1.svg";
import green from "../images/chart-2.svg";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
function AllCoinsList() {
  const [data, setData] = useState([]);

  const [filterdData, setFilterdData] = useState(data);
  const [loader, setloader] = useState(true);
  let currency = window.localStorage.getItem("currency");
  useEffect(() => {
    let period = "24h";
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&sparkline=false&price_change_percentage=${period}`
      )
      .then((res) => res.data)
      .then((data) => {
        setloader(true);
        setData(data);
        setFilterdData(data);
      });
  }, []);

  const [countPill, setCountPill] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPearPage, setPostPearPage] = useState(10);
  const lastPostIndex = currentPage * postPearPage;
  const firstPostIndex = lastPostIndex - postPearPage;
  const PostsPillFinal = filterdData.slice(firstPostIndex, lastPostIndex);
  const [media, setMedia] = useState("medium");
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setMedia("small");
    } else if (window.matchMedia("(min-width: 768px)").matches) {
      setMedia("medium");
    } else if (window.matchMedia("(min-width: 1000px)").matches) {
      setMedia("large");
    }
  }, []);

  const handelPages = (e, p) => {
    setCurrentPage(p);
  };

  const filterdataaa = (e) => {
    setFilterdData(
      data.filter((el) => {
        return el.id.includes(e.target.value);
      })
    );

    if (e.target.value === "") {
      setFilterdData(data);
    }

    console.log(e.target.value);
  };

  return (
    <section className="section market" aria-label="market update" data-section>
      <div className="container">
        <div className="title-wrapper">
          <h2 className="h2 section-title">Market Update</h2>
        </div>
        <input
          type="text"
          className="filterinput"
          onChange={filterdataaa}
          placeholder="Search for Currency"
        />

        <div className="market-tab">
          <table className="market-table">
            <thead className="table-head">
              <tr className="table-row table-title">
                <th className="table-heading"></th>

                <th
                  className="table-heading"
                  scope="col"
                  style={{ textAlign: "center" }}
                >
                  #
                </th>

                <th className="table-heading" scope="col">
                  Name
                </th>

                <th className="table-heading" scope="col">
                  Last Price
                </th>

                <th className="table-heading" scope="col">
                  24h %
                </th>

                <th className="table-heading" scope="col">
                  Market Cap
                </th>

                <th className="table-heading" scope="col">
                  Last 7 Days
                </th>

                <th className="table-heading"></th>
              </tr>
            </thead>

            <tbody className="table-body">
              {(() => {
                if (loader) {
                  return filterdData.map((e, i) => {
                    return (
                      <tr className="table-row" key={i}>
                        <td className="table-data"></td>

                        <th className="table-data rank" scope="row">
                          {i + 1}
                        </th>

                        <td className="table-data">
                          <div className="wrapper">
                            <img
                              src={e.image}
                              width="20"
                              height="20"
                              alt="Bitcoin logo"
                              className="img"
                            />

                            <h3>
                              <a href="#" className="coin-name">
                                {e.id}{" "}
                                <span className="span">
                                  {e.symbol.toUpperCase()}
                                </span>
                              </a>
                            </h3>
                          </div>
                        </td>

                        <td className="table-data last-price">
                          $
                          {e.current_price
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>

                        <td className="table-data last-update green">
                          {e.price_change_percentage_24h > 0
                            ? `+${e.price_change_percentage_24h.toFixed(2)}%`
                            : `${e.price_change_percentage_24h.toFixed(2)}%`}
                        </td>

                        <td className="table-data market-cap">
                          {currency === "USD" ? "$" : "€"}{" "}
                          {e.market_cap
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>

                        <td className="table-data">
                          <img
                            src={
                              e.price_change_percentage_24h > 0 ? red : green
                            }
                            width="100"
                            height="40"
                            alt="profit chart"
                            className="chart"
                          />
                        </td>

                        <td className="table-data">
                          <Link
                            to={`/${e.id}`}
                            className="btn btn-outline text-"
                          >
                            show
                          </Link>
                        </td>
                      </tr>
                    );
                  });
                }
              })()}
            </tbody>
          </table>
          <Pagination
            count={Math.ceil(countPill / 5)}
            size={media}
            onChange={handelPages}
          />
        </div>
      </div>
    </section>
  );
}

export default AllCoinsList;
