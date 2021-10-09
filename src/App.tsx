import React, { ChangeEvent, useState, useEffect } from "react";
import "./App.scss";

import background from "./images/background.png";
import { mintTokens } from "./contract/BABF.contract";
import settings from "./contract/settings.json";
import Tasks from "./component/tasks.component";

function App() {
  // data for selecting
  const [tokens, setTokens] = useState([
    { name: "", address: "", abi: "", method: "" },
  ]);
  const [wallets, setWallets] = useState([
    { name: "", address: "", priKey: "" },
  ]);
  const [threads, setThreads] = useState([
    {
      id: 0,
      wallet: "",
      token: "",
      NFT: "",
      amount: "",
      gas: "",
      isEarly: false,
    },
  ]);
  const [threadStatus, setThreadStatus] = useLocalStorage('');

  useEffect(() => {
    const tokenDatas = [];
    const walletDatas = [];
    const threadDatas = [];

    for (let i = 0; i < settings.tokens.length; i++) {
      const token = settings.tokens[i];
      tokenDatas.push({
        name: token.tokenName,
        address: token.tokenAddress,
        abi: token.tokenABI,
        method: token.methodName,
      });
    }
    for (let i = 0; i < settings.wallets.length; i++) {
      const wallet = settings.wallets[i];
      walletDatas.push({
        name: wallet.walletName,
        address: wallet.walletAddress,
        priKey: wallet.walletPrivateKey,
      });
    }
    for (let i = 0; i < settings.threads.length; i++) {
      const thread = settings.threads[i];
      threadDatas.push({
        id: i,
        wallet: thread.walletName,
        token: thread.tokenName,
        NFT: thread.NFT_amount,
        amount: thread.Payable_amount,
        gas: thread.Gas_Fee,
        isEarly: thread.isEarly,
      });
    }
    setTokens(tokenDatas as any);
    setWallets(walletDatas as any);
    setThreads(threadDatas as any);
    localStorage.setItem('threadStatus', '');
    setThreadStatus('');
    return;
  }, []);

  useEffect(() => {
    // storing input name
    const status = localStorage.getItem('threadStatus') || '';
    setThreadStatus(status);
  }, [threadStatus]);

  const getTokenID = (tokenName: any) => {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].name === tokenName) {
        return i;
      }
    }
    return -1;
  };
  const getWalletID = (walletName: any) => {
    for (let i = 0; i < wallets.length; i++) {
      if (wallets[i].name === walletName) {
        return i;
      }
    }
    return -1;
  };
  const initStatus = (length: any) => {
    let status = '';
    for (let i = 0; i < length; i ++) {
      status = status.concat(`&thread${i}=1`);
    }
    console.log(`status is ${status}`);
    setThreadStatus(status);
    localStorage.setItem('threadStatus', status);
  }
  const startMinting = async () => {
    initStatus(threads.length);
    for (let i = 0; i < threads.length; i++) {
      const thread = threads[i];
      const tokenId = getTokenID(thread.token);
      if (tokenId === -1) {
        continue;
      }
      const walletId = getWalletID(thread.wallet);
      if (walletId === -1) {
        continue;
      }
      mintTokens(
        i,
        thread.NFT,
        thread.amount,
        thread.gas,
        tokens[tokenId],
        wallets[walletId],
        thread.isEarly,
        setThreadStatus
      );
    }
  };

  return (
    <section
      className="mintingSection"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="mintingDiv">
        <h1 className="title">Mint Settings</h1>

        <Tasks tasks={threads} threadStatus={threadStatus} />

        <div className="processButton">
          <button type="button" className="btn-process" onClick={startMinting} >
            Mint Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
function useLocalStorage(localStorageKey: string): [any, any] {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ""
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
}

