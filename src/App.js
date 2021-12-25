import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [currAccount, setCurrAccount] = useState(null);
  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have metamask!');
        return;
      } else {
        console.log('We have the etherium object', ethereum);

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('We found an authorized account:', account);
          setCurrAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Get Metamask!');
        return;
      } else {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        });
        console.log('Connected account:', accounts[0]);
        setCurrAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Pokemon D</p>
          <p className="sub-text">Join the other trainer and beat the enemy!</p>
          <div className="connect-wallet-container">
            <img
              src="https://media.giphy.com/media/cNlhpWYx5PGsOGXAil/giphy.gif"
              alt="Monty Python Gif"
            />
            <button
              className="cta-button connect-wallet-button"
              onClick={connectWalletAction}
            >
              Connect Wallet To Get Started
            </button>
          </div>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
