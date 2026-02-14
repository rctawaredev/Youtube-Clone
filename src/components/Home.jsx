import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
const Home = () => {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <div>
      {showBanner && (
        <div className="bg-[url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')] h-50 w-full bg-cover">
          <div className="flex  justify-between items-center px-6 py-4">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className="h-6"
            />

            <RxCross2
              className="text-2xl"
              onClick={() => setShowBanner(!showBanner)}
            />
          </div>
          <h1 className="px-6 md:text-xl sm:text-md w-[40%]">
            Buy Nxt Watch Premium prepaid plans with UPI
          </h1>
          <button className="border text-xs m-6 p-2 px-2 rounded-md font-light">
            GET IT NOW
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
