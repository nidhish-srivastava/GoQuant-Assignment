type OrderbookDisplayProps= {
    bids : [string,string][],
    asks : [string,string][]
}
function OrderbookDisplay({bids,asks} : OrderbookDisplayProps) {
    // Color coding logic for bids and asks
    const getColorForBid = (index: number) => {
      if (index === 0) return 'bg-green-100'; // Most recent bid
      return parseFloat(bids[index][0]) > parseFloat(bids[index - 1][0]) ? 'bg-green-100' : 'bg-red-100'; // Green if the price is higher than previous
    };
  
    const getColorForAsk = (index: number) => {
      if (index === 0) return 'bg-green-100'; // Most recent ask
      return parseFloat(asks[index][0]) < parseFloat(asks[index - 1][0]) ? 'bg-green-100' : 'bg-red-100'; // Green if the price is lower than previous
    };
  return (
    <div className="flex justify-center items-start gap-8">
        <div className="border p-4 mb-4 bg-white rounded shadow-md w-full">
          <h2 className="text-xl font-semibold mb-8">Buy Orders</h2>
          <div className="flex justify-between mb-4 font-semibold">
            <span>Price</span>
            <span>Quantity</span>
          </div>
          <ul className="list-none">
            {bids && bids.map((bid, index) => (
                <li key={index} className={`flex justify-between py-1 ${getColorForBid(index)}`}>
                <span>{bid[0]}</span>
                <span>{bid[1]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border p-4 bg-white rounded shadow-md w-full">
          <h2 className="text-xl font-semibold mb-8">Sell Orders</h2>
          <div className="flex justify-between mb-4 font-semibold">
            <span>Price</span>
            <span>Quantity</span>
          </div>
          <ul className="list-none">
            {asks && asks.map((ask, index) => (
             <li key={index} className={`flex justify-between py-1 ${getColorForAsk(index)}`}>
                <span>{ask[0]}</span>
                <span>{ask[1]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
  )
}

export default OrderbookDisplay