import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";

import background from "./images/background.png";
import plusbutton from "./images/img-plus.png";
import minusbutton from "./images/img-minus.png";
import etherico from "./images/img-ether.png";

function App() {
  const [countEth, setCountEth] = useState(0);
  const [isZero, setIsZero] = useState(true);
  const [serviceFee, setServiceFee] = useState(0);

  const minusEther = () => {
    if (countEth > 0) {
      setCountEth(countEth - 1);
      setIsZero(false);
      if (countEth === 1) {
        setIsZero(true);
      }
    }
  };
  const plusEther = () => {
    setCountEth(countEth + 1);
    setIsZero(false);
  };
  const startMinting = async () => {};
  return (
    <section
      className="mintingSection"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="mintingDiv">
        <h1 className="title">Mint Settings</h1>
        <div className="ether-count">
          <div
            className="div-manage"
            onClick={() => minusEther()}
            aria-hidden="true"
          >
            <img
              className="manage-ether minus"
              src={minusbutton}
              alt="minus ether"
              // hidden={isZero}
            />
          </div>
          <p id="count-ether" className="count-ether">
            {countEth}
          </p>
          <div
            className="div-manage"
            onClick={() => plusEther()}
            aria-hidden="true"
          >
            <img className="manage-ether" src={plusbutton} alt="plus ether" />
          </div>
          <div className="split" />
          <img className="ether-icon" src={etherico} alt="ether icon" />
          <p id="value-ether" className="count-ether">
            {countEth / 10}
          </p>
        </div>
        <p className="minting-info">
          <span className="value-info">Service Fee</span>
          {serviceFee} ETH
        </p>
        <p className="minting-info">
          <span className="value-info">Total</span>
          {countEth / 10 - serviceFee} ETH
        </p>
        <div className="processButton">
          <button
            type="button"
            className="btn-process"
            onClick={startMinting}
            disabled={isZero}
          >
            START MINT
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
