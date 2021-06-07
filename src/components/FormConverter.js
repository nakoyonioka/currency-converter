import React, { useState, useRef } from "react";
import axios from "axios";

const BASE_URL = "https://free.currconv.com";
const API_KEY = process.env.REACT_APP_CURRENCY_API;

export default function FormConverter({ currencies, setConversionResult }) {
  const fromRef = useRef();
  const toRef = useRef();
  const [inputNumber, setInputNumber] = useState();

  function changeHandler(e) {
    setInputNumber(e.target.value);
  }

  function clickHandler(e) {
    e.preventDefault();
    const url =
      BASE_URL +
      `/api/v7/convert?q=${fromRef.current.value}_${toRef.current.value}&compact=ultra&apiKey=${API_KEY}`;
    fetchConversionRate(url);
  }

  async function fetchConversionRate(url) {
    const res = await axios.get(url);
    try {
      if (inputNumber !== undefined) {
        const rate = parseFloat(Object.values(res.data)[0]);
        setConversionResult(parseFloat(inputNumber) * rate);
      } else {
        setConversionResult(null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form>
      <div className="convert-from">
        <label htmlFor="from">From:</label>
        <select ref={fromRef} name="from" id="from">
          {currencies !== undefined &&
            currencies.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
      <input type="text" name="amount" onChange={changeHandler} />
      <div className="convert-to">
        <label htmlFor="to">To:</label>
        <select ref={toRef} name="to" id="to">
          {currencies !== undefined &&
            currencies.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
      <button onClick={clickHandler}>Convert</button>
    </form>
  );
}
