import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import Arena from './Components/Arena';
import LoadingIndicator from './Components/LoadingIndicator';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import PokemonD from './utils/PokemonD.json';

// Constants

const App = () => {
  const [currAccount, setCurrAccount] = useState(null);
  const [currChar, setCurrChar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have metamask!');
        setIsLoading(false);
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
    setIsLoading(false);
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

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }
    if (!currAccount) {
      return (
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
      );
    } else if (currAccount && !currChar) {
      return <SelectCharacter setCharNFT={setCurrChar} />;
    } else if (currAccount && currChar) {
      return <Arena characterNFT={currChar} setCharacterNFT={setCurrChar} />;
    }
  };

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        if (window.ethereum.networkVersion !== '4') {
          alert('Please connect to Rinkeby!');
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkNetwork();
    setIsLoading(true);
    checkWalletConnection();
  }, []);

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', currAccount);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        PokemonD.abi,
        signer
      );
      const txn = await gameContract.checkIfUserHasNFT();
      if (txn.name) {
        console.log('User has character NFT');
        setCurrChar(transformCharacterData(txn));
      } else {
        console.log('No character NFT found');
      }

      setIsLoading(false);
    };

    if (currAccount) {
      console.log('Current Account:', currAccount);
      fetchNFTMetadata();
    }
  }, [currAccount]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Pokemon D</p>
          <p className="sub-text">Join the other trainer and beat the enemy!</p>
          {renderContent()}
        </div>
        <div className="footer-container">
          <div className="footer-text">&copy; mindy 2021</div>
        </div>
      </div>
    </div>
  );
};

export default App;
