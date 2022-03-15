import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios"
import CurrencySelect from './components/CurrencySelect';

const BASE_URL = 'https://free.currconv.com';
const API_KEY = process.env.REACT_APP_CONVERTER_API_KEY;

function App() {

  const [count, setCount] = useState(0);
  const [from, setFrom] = useState("CAD");
  const [to, setTo] = useState("USD");
  const [rate, setRate] = useState([]);
  const[result,setResult] = useState(0)

  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = useCallback(async () => {
    // // get all currencies
    // axios({
    //   method: "GET",
    //   url: `${BASE_URL}/api/v7/currencies?apiKey=${API_KEY}`,
    // }).then((response) => {
    //   // results: [{ id, currencyName, currencySymbol }]
    //   setCurrencies(Object.values(response.data.results));
    // }).catch((e) => {
    //   setError(e.message);
    // })

    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URL}/api/v7/currencies?apiKey=${API_KEY}`,
      });
      setCurrencies(Object.values(response.data.results));
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const swapFromTo = useCallback(() => {
    const swap = to;
    setTo(from);
    setFrom(swap);
  }, [from, to]);

  const getRate = (from, to) => {
    axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${API_KEY}`,
    })
      .then((response) => {
        console.log(response.data);

        setRate(response.data);
        const m = {}  ;
        console.log( rate["${from}_${to}"]);
        console.log({count});
        console.log(m);
        console.log({result});
        setResult();
      })

  };

  return (
    <div className='app'>
       <div className='container'>
           <label htmlFor='Montant'>Montant</label>
           <input type="number" id="Montant" name="Montant" placeholder="0" onChange={(e) => setCount(e.target.value)}/>
       </div>
       <div className='container-flex'>
         <CurrencySelect currencies={currencies} selected={to} setSelected={setTo} />
         <button className='change' onClick={swapFromTo}> ⇆ </button>
         <CurrencySelect currencies={currencies} selected={from} setSelected={setFrom} />
       </div>

       <button className='convertir' onClick={() => {getRate(from, to);}}>Convertir</button>
       <div className='result'>1 {from} = {rate[`${from}_${to}`]} <h1>{to}</h1> </div>
    </div>
  );
}

export default App;
