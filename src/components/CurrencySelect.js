import React from 'react'

export default function CurrencySelect({ currencies, selected, setSelected }) {
  return (
    <select className='money' onChange={(e) => setSelected(e.target.value)} value={selected}>
      {currencies.map(({ id, currencyName, currencySymbol }) => (
        <option key={id} value={id}>{id} ({currencyName})</option>
      ))}
    </select>
  )
}
