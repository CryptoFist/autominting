import React, { ChangeEvent, useState, useEffect } from "react";
import "./App.scss";

import background from "./images/background.png";
import { mintTokens, getEtherBalance, getBABFBalance } from "./contract/BABF.contract";
import settings from "./contract/settings.json";
import Details from "./component/details.component";
import Settings from "./component/settings.component";
import Selecting from "./component/selecting.component";

function App() {
  
  const [isZero, setIsZero] = useState(true);

  // data for selecting
  const [tokens, setTokens] = useState([{name: '', address: '', abi: '', method: ''}]);
  const [wallets, setWallets] = useState([{name: '', address: '', priKey: ''}]);
  const [tokenID, setTokenID] = useState(0);
  const [walletID, setWalletID] = useState(0); 

  // data for settings
  const [nftCount, setNFTCount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [gasFee, setGasFee] = useState(0);

  // data for details
  const [ethBalance, setEthBalance] = useState(0);
  const [nftBalance, setNFTBalance] = useState(0);
  const [txStatus, setTxStatus] = useState('tx not start');

  useEffect(() => {
    console.log('loading settings');
    const tokenDatas = [];
    const walletDatas = [];
    for (let i = 0; i < settings.tokens.length; i ++) {
      const token = settings.tokens[i];
      tokenDatas.push({name: token.tokenName, address: token.tokenAddress, abi: token.tokenABI, method: token.methodName});
    }
    for (let i = 0; i < settings.wallets.length; i ++) {
      const wallet = settings.wallets[i];
      walletDatas.push({name: wallet.walletName, address: wallet.walletAddress, priKey: wallet.walletPrivateKey });
    }
    setTokens(tokenDatas as any);
    setWallets(walletDatas as any);
    return;
  }, []);

  const startMinting = async () => {
    const tmp = isZero;
    setIsZero(true);
    setTxStatus('minting...');
    const result = await mintTokens(nftCount, payableAmount, gasFee, tokens[tokenID], wallets[walletID], setTxStatus);
    setIsZero(tmp);
    if (result === true) {
      console.log('minted successfully');
    } else {
      console.log('minting failed!');
    }
  };
  const selectAccount = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    setWalletID(selectedIndex);
  }
  const selectToken = async (e: ChangeEvent<HTMLSelectElement>) => {
    setTokenID(e.target.selectedIndex);
  }
  const changePayableAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0 && nftCount > 0 && gasFee > 0) {
      setIsZero(false);
    } else {
      setIsZero(true);
    }
    setPayableAmount(Number(value));
  }
  const changeNFT = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0 && payableAmount > 0 && gasFee > 0) {
      setIsZero(false);
    } else {
      setIsZero(true);
    }
    setNFTCount(Number(value));
  }
  const changeGasFee = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0 && payableAmount > 0 && nftCount > 0) {
      setIsZero(false);
    } else {
      setIsZero(true);
    }
    setGasFee(Number(value));
  }

  return (
    <section
      className="mintingSection"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="mintingDiv">
        <h1 className="title">Mint Settings</h1>
        
        <Selecting selectAccount={selectAccount} selectToken={selectToken} wallets={wallets} tokens={tokens} />
        <Settings changeNFT={changeNFT} nftCount={nftCount} payableAmount={payableAmount} changePayableAmount={changePayableAmount}
              gasFee={gasFee} changeGasFee={changeGasFee} />
        <Details nftBalance={nftBalance} txStatus={txStatus} ethBalance={ethBalance} />
       
        <div className="processButton">
          <button
            type="button"
            className="btn-process"
            onClick={startMinting}
            disabled={isZero}
          >
            Mint Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
