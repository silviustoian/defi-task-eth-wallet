// src/components/wallet.js
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./index.css"
const Wallet = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const w3 = new Web3(window.ethereum);
      setWeb3(w3);
    } else {
      setStatus("No Ethereum provider found. Please install MetaMask.");
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setStatus("No Ethereum provider found. Please install MetaMask.");
        return;
      }

      const w3 = new Web3(window.ethereum);
      setWeb3(w3);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        setStatus("No accounts found in wallet.");
        return;
      }

      const acc = accounts[0];
      setAccount(acc);
      fetchBalance(w3, acc);
      setStatus("Wallet connected.");
    } catch (err) {
      console.error(err);
      setStatus("Failed to connect wallet.");
    }
  };

  const fetchBalance = async (w3, acc) => {
    try {
      const weiBalance = await w3.eth.getBalance(acc);
      const eth = w3.utils.fromWei(weiBalance, "ether");
      setBalance(eth);
    } catch (err) {
      console.error(err);
      setStatus("Failed to fetch balance.");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      setStatus("No Ethereum provider found. Please install MetaMask.");
      return;
    }

    const w3 = web3 || new Web3(window.ethereum);

    if (!account) {
      setStatus("Connect your wallet first.");
      return;
    }
    if (!toAddress || !amount) {
      setStatus("Please enter address and amount.");
      return;
    }

    try {
      setStatus("Sending transaction...");
      await w3.eth.sendTransaction({
        from: account,
        to: toAddress,
        value: w3.utils.toWei(amount, "ether"),
      });
      setStatus("Transaction sent successfully.");
      fetchBalance(w3, account);
    } catch (err) {
      console.error(err);
      setStatus("Transaction failed.");
    }
  };

  return (
    <div className="wallet-page">
      <div className="wallet-card">
        <h1 className="wallet-title">ETH Wallet (Demo)</h1>

        {!account ? (
          <button className="wallet-button primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <div className="wallet-row">
              <span className="wallet-label">Address:</span>
              <span className="wallet-address">{account}</span>
            </div>
            <div className="wallet-row">
              <span className="wallet-label">Balance:</span>
              <span className="wallet-value">{balance} ETH</span>
            </div>
          </div>
        )}

        <form className="wallet-form" onSubmit={handleSend}>
          <div className="wallet-field">
            <label className="wallet-field-label">To address</label>
            <input
              type="text"
              className="wallet-input"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="0x..."
            />
          </div>
          <div className="wallet-field">
            <label className="wallet-field-label">Amount (ETH)</label>
            <input
              type="number"
              step="0.0001"
              className="wallet-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.01"
            />
          </div>
          <button type="submit" className="wallet-button success">
            Send ETH
          </button>
        </form>

        <div className="wallet-receive">
          <span className="wallet-label">Receive:</span>
          <span className="wallet-text">
            share your address above to receive ETH.
          </span>
        </div>

        {status && (
          <div className="wallet-status">
            <span className="wallet-label">Status:</span>
            <span className="wallet-text">{status}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;