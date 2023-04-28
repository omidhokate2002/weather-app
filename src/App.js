import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Weather() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");

  // function to get temp data
  const getTempData = async (api, query) => {
    let url =`${process.env.REACT_APP_API_URL}?q=${query}&units=metric&appid=${api}`;
    try {
      const response = await axios.get(url);
      setData(response.data.main);
      setCity(query);
    } catch (error) {
      console.log("error in get data", error);
      setData(null);
    }
  };

  // handle button click
  const handleButtonClick = () => {
    getTempData(process.env.REACT_APP_API_KEY
, inputValue);
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Omis Weather App</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter City Name"
              value={inputValue}
              onInput={(e) => setInputValue(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleButtonClick}
            >
              Show Weather
            </button>
          </div>
        </div>
      </div>
      {data ? (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card my-5">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  Weather Details of City: {city}
                </h5>
              </div>
              <div className="card-body">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Current Temperature:</td>
                      <td>{data.temp} °C</td>
                    </tr>
                    <tr>
                      <td>Temperature Range:</td>
                      <td>
                        {data.temp_min} °C to {data.temp_max} °C
                      </td>
                    </tr>
                    <tr>
                      <td>Humidity:</td>
                      <td>{data.humidity}</td>
                    </tr>
                    <tr>
                      <td>Sea Level:</td>
                      <td>{data.sea_level}</td>
                    </tr>
                    <tr>
                      <td>Ground Level:</td>
                      <td>{data.grnd_level}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const App = () => {
  return (
    <div>
      <Weather />
    </div>
  );
};

export default App;
