import React, { useState,useEffect } from 'react';
import axios from "axios"

function App() {

  const [count, setCount] = useState(0);
  const [first, setFirst] = useState("CAD");
  const [second, setSecond] = useState("USD");
  const [rate, setRate] = useState([]);
  const[result,setResult] = useState(0)
  
  
  const getRate = (first, second) => {
    axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=5a49beefa5e7696bc287`,
    })
      .then((response) => {
        console.log(response.data);

        setRate(response.data);
        const m = {}  ;
        console.log( rate["${first}_${second}"]);
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
         <select id="country" name="country" className='money' onChange={(e) => setFirst(e.target.value)}>
           <option value="CAD">CAD</option>
           <option value="USD">USD</option> 
           <option value="AED">AED</option> 
           <option value="GBP">GBP</option> 
           <option value="TND">TND</option> 
         </select>
         <button className='change'> ⇆ </button>
         <div className='money'>USD</div>
       </div>

       <button className='convertir' onClick={() => {getRate(first, second);}}>Convertir</button>
       <div className='result'>1 {first} = {rate[`${first}_${second}`]} <h1>{second}</h1> </div>  
    </div>
  );
}

export default App;