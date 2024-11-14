"use client";
import { useEffect, useState } from "react";
import MarketDepthChart from "@/components/MarketDepthChart";
import SpreadIndicator from "@/components/SpreadIndicator";
import OrderbookDisplay from "@/components/OrderbookDisplay";
import TradingPairSelector from "@/components/TradingPairSelector";

// Type definitions
interface OrderbookData {
  bids: [string, string][];
  asks: [string, string][];
}

const Home = () => {
  const [bids, setBids] = useState<[string, string][]>([]);
  const [asks, setAsks] = useState<[string, string][]>([]);
  const [imbalance, setImbalance] = useState<number>(0);
  const [spreadData, setSpreadData] = useState<number[]>([]);
  const [spreadLabels, setSpreadLabels] = useState<string[]>([]);
  const [orderbookData, setOrderbookData] = useState<OrderbookData | null>(
    null
  );
  const [selectedPair, setSelectedPair] = useState<string>("BTCUSDT");

  // Fetch the orderbook data
  const fetchOrderbookHandler = async () => {
    const url = `https://binance43.p.rapidapi.com/depth?symbol=${selectedPair}&limit=10`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
        "x-rapidapi-host": "binance43.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const newBids = result.bids;
      const newAsks = result.asks;

      setOrderbookData({
        bids: newBids,
        asks: newAsks,
      });
      setBids(newBids);
      setAsks(newAsks);
      calculateImbalance(newBids, newAsks);
      updateSpreadData(newBids, newAsks);
    } catch (error) {
      console.error("Error fetching orderbook data:", error);
    }
  };

  const calculateImbalance = (
    bids: [string, string][],
    asks: [string, string][]
  ) => {
    const totalBuyVolume = bids.reduce(
      (total, bid) => total + parseFloat(bid[1]),
      0
    );
    const totalSellVolume = asks.reduce(
      (total, ask) => total + parseFloat(ask[1]),
      0
    );
    const imbalance =
      (totalBuyVolume - totalSellVolume) / (totalBuyVolume + totalSellVolume);
    setImbalance(imbalance);
  };

  const updateSpreadData = (
    bids: [string, string][],
    asks: [string, string][]
  ) => {
    const bestBid = parseFloat(bids[0][0]);
    const bestAsk = parseFloat(asks[0][0]);
    const spread = bestAsk - bestBid;

    const currentTime = new Date().toLocaleTimeString();

    setSpreadData((prevData) => {
      const newData = [...prevData, spread];
      if (newData.length > 60) newData.shift();
      return newData;
    });

    setSpreadLabels((prevLabels) => {
      const newLabels = [...prevLabels, currentTime];
      if (newLabels.length > 60) newLabels.shift();
      return newLabels;
    });
  };

  // Effect to fetch orderbook data whenever selectedPair changes
  useEffect(() => {
    // Fetch initial data for the selected pair
    fetchOrderbookHandler();

    // Set up interval to fetch data every second
    const intervalId = setInterval(fetchOrderbookHandler, 1000);

    // Clear interval on component unmount or when selectedPair changes
    return () => clearInterval(intervalId);
  }, [selectedPair]); // Re-run effect when selectedPair changes

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Order Book - {selectedPair}</h2>
      <TradingPairSelector
        selectedPair={selectedPair}
        setSelectedPair={setSelectedPair}
      />
      <div className="mt-8">
        <SpreadIndicator spreadLabels={spreadLabels} spreadData={spreadData} />
      </div>
      <div className="border p-4 bg-white rounded shadow-md w-full mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Orderbook Imbalance Indicator
        </h2>
        <p className="text-lg">{(imbalance * 100).toFixed(2)}%</p>
      </div>

      <OrderbookDisplay asks={asks} bids={bids} />

      {orderbookData && <MarketDepthChart orderbookData={orderbookData} />}
    </div>
  );
};

export default Home;
