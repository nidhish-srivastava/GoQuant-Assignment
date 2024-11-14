type TradingPairSelectorProps = {
    selectedPair : string,
    setSelectedPair : React.Dispatch<React.SetStateAction<string>>
}

function TradingPairSelector({selectedPair,setSelectedPair} : TradingPairSelectorProps) {
  return (
    <div className="absolute right-4 top-4">
    <label htmlFor="pair-select" className="font-semibold">
      Select Trading Pair{" "}
    </label>
    <select
      id="pair-select"
      value={selectedPair}
      onChange={(e) => setSelectedPair(e.target.value)}
      className="p-2 border-none outline-none rounded"
    >
      <option value="BTCUSDT">BTC/USDT</option>
      <option value="ETHUSDT">ETH/USDT</option>
      <option value="XRPUSDT">XRP/USDT</option>
    </select>
  </div>
  )
}

export default TradingPairSelector