import MarketSection from "../components/MarketSection";
import MarketList from "../components/MarketList";

function Market() {
  return (
    <>
      <MarketSection />
      <hr className="border-t border-gray-300 mb-6" />
      <MarketList />
    </>
  );
}

export default Market;