type OrderbookDisplayProps = {
  bids: [string, string][],
  asks: [string, string][],
};

const getColorForPriceChange = (currentPrice: string, previousPrice: string, isBid: boolean) => {
  if (isBid) {
    return parseFloat(currentPrice) > parseFloat(previousPrice) ? 'bg-green-100' : 'bg-red-100';
  }
  return parseFloat(currentPrice) < parseFloat(previousPrice) ? 'bg-green-100' : 'bg-red-100';
};

const OrderbookSection = ({
  title,
  orders,
  getColorForPrice,
}: {
  title: string,
  orders: [string, string][],
  getColorForPrice: (index: number) => string,
}) => (
  <div className="border p-4 mb-4 bg-white rounded shadow-md w-full">
    <h2 className="text-xl font-semibold mb-8">{title}</h2>
    <div className="flex justify-between px-4 items-start mb-4 font-semibold">
      <span>Price</span>
      <span>Quantity</span>
    </div>
    <ul className="list-none">
      {orders.map((order, index) => (
        <li key={index} className={`flex justify-between py-2 px-2 ${getColorForPrice(index)}`}>
          <span>{order[0]}</span>
          <span>{order[1]}</span>
        </li>
      ))}
    </ul>
  </div>
);

function OrderbookDisplay({ bids, asks }: OrderbookDisplayProps) {
  const getColorForBid = (index: number) => {
    return index === 0
      ? 'bg-green-100'
      : getColorForPriceChange(bids[index][0], bids[index - 1][0], true);
  };

  const getColorForAsk = (index: number) => {
    return index === 0
      ? 'bg-green-100'
      : getColorForPriceChange(asks[index][0], asks[index - 1][0], false);
  };

  return (
    <div className="flex justify-center items-start gap-8">
      <OrderbookSection
        title="Buy Orders"
        orders={bids}
        getColorForPrice={getColorForBid}
      />
      <OrderbookSection
        title="Sell Orders"
        orders={asks}
        getColorForPrice={getColorForAsk}
      />
    </div>
  );
}

export default OrderbookDisplay;
