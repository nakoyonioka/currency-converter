import ConverterData from "./components/ConverterData";
import FormConverter from "./components/FormConverter";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://free.currconv.com";
const API_KEY = process.env.REACT_APP_CURRENCY_API;
let firstRender = true;

function App() {
  const [currencies, setCurrencies] = useState();
  const [conversionResult, setConversionResult] = useState("");

  useEffect(() => {
    const url = BASE_URL + `/api/v7/currencies?apiKey=${API_KEY}`;
    const fetchCurrencyList = async () => {
      const res = await axios.get(url);
      try {
        setCurrencies(Object.keys(res.data.results));
      } catch (err) {
        console.log(err);
      }
    };
    if (firstRender) {
      firstRender = false;
      fetchCurrencyList();
    }
  }, []);

  return (
    <div className="container">
      <FormConverter
        currencies={currencies}
        setConversionResult={setConversionResult}
      />
      <ConverterData conversionResult={conversionResult} />
    </div>
  );
}

export default App;
